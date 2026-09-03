import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { resend, REMITENTE, EMAIL_NOTIFICACIONES_CENTRO } from "@/lib/resend";
import { emailConfirmacionReserva, emailAvisoNuevaCita } from "@/lib/emailTemplates";
import { areas } from "@/lib/areas";

export async function POST(req: NextRequest) {
  const b=await req.json();
  const {fecha,hora,servicio_slug,profesional_id,nombre_paciente,edad,rut_paciente,telefono,email,notas}=b;
  if(!fecha||!hora||!servicio_slug||!profesional_id||!nombre_paciente||!edad||!rut_paciente||!telefono)
    return NextResponse.json({error:"Faltan datos obligatorios"},{status:400});
  const {data,error}=await supabaseAdmin.from("citas").insert({fecha,hora,servicio_slug,profesional_id,nombre_paciente,edad,rut_paciente,telefono,email:email||null,notas:notas||null}).select().single();
  if(error){ if(error.code==="23505") return NextResponse.json({error:"Esa hora ya fue reservada. Elige otra."},{status:409}); return NextResponse.json({error:error.message},{status:500}); }

  // Envío de correos: nunca debe romper la reserva si Resend falla o no está configurado.
  try {
    const { data: prof } = await supabaseAdmin.from("profesionales").select("nombre").eq("id", profesional_id).maybeSingle();
    const detalle = {
      nombrePaciente: nombre_paciente,
      edad,
      areaNombre: areas.find(a=>a.slug===servicio_slug)?.nombre ?? servicio_slug,
      profesionalNombre: prof?.nombre ?? "el equipo de Anidar",
      fecha,
      hora,
      telefono,
      email,
      rut: rut_paciente,
      notas,
    };
    if (email) {
      const { subject, html } = emailConfirmacionReserva(detalle);
      await resend.emails.send({ from: REMITENTE, to: email, subject, html });
    }
    const { subject, html } = emailAvisoNuevaCita(detalle);
    await resend.emails.send({ from: REMITENTE, to: EMAIL_NOTIFICACIONES_CENTRO, subject, html });
  } catch (err) {
    console.error("Error enviando emails de nueva cita:", err);
  }

  return NextResponse.json({cita:data});
}
