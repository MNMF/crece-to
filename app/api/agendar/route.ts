import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fecha, hora, servicio_slug, nombre_paciente, telefono, email, notas } = body;

  if (!fecha || !hora || !servicio_slug || !nombre_paciente || !telefono) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  // La restricción unique(fecha, hora) en la base de datos es la protección
  // real contra doble reserva (evita condiciones de carrera).
  const { data, error } = await supabaseAdmin
    .from("citas")
    .insert({
      fecha,
      hora,
      servicio_slug,
      nombre_paciente,
      telefono,
      email: email || null,
      notas: notas || null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Esa hora ya fue reservada. Elige otra." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // TODO: aquí se puede enviar un email de confirmación con Resend.

  return NextResponse.json({ cita: data });
}
