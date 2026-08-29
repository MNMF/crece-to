import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
export async function POST(req: NextRequest) {
  const b=await req.json();
  const {fecha,hora,servicio_slug,profesional_id,nombre_paciente,rut_paciente,telefono,email,notas}=b;
  if(!fecha||!hora||!servicio_slug||!profesional_id||!nombre_paciente||!rut_paciente||!telefono)
    return NextResponse.json({error:"Faltan datos obligatorios"},{status:400});
  const {data,error}=await supabaseAdmin.from("citas").insert({fecha,hora,servicio_slug,profesional_id,nombre_paciente,rut_paciente,telefono,email:email||null,notas:notas||null}).select().single();
  if(error){ if(error.code==="23505") return NextResponse.json({error:"Esa hora ya fue reservada. Elige otra."},{status:409}); return NextResponse.json({error:error.message},{status:500}); }
  return NextResponse.json({cita:data});
}
