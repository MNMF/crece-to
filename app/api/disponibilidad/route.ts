import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function generarBloques(horaInicio: string, horaFin: string, dur=60) {
  const bloques: string[] = [];
  const [hI,mI]=horaInicio.split(":").map(Number);
  const [hF,mF]=horaFin.split(":").map(Number);
  let c=hI*60+mI; const fin=hF*60+mF;
  while(c+dur<=fin){ bloques.push(`${Math.floor(c/60).toString().padStart(2,"0")}:${(c%60).toString().padStart(2,"0")}`); c+=dur; }
  return bloques;
}

export async function GET(req: NextRequest) {
  const fecha=req.nextUrl.searchParams.get("fecha");
  const profesionalId=req.nextUrl.searchParams.get("profesionalId");
  if (!fecha||!profesionalId) return NextResponse.json({error:"Faltan parámetros"},{status:400});
  const diaSemana=new Date(fecha+"T00:00:00").getDay();
  const {data:disp,error:e1}=await supabaseAdmin.from("disponibilidad").select("hora_inicio,hora_fin").eq("profesional_id",profesionalId).eq("dia_semana",diaSemana).eq("activo",true);
  if(e1) return NextResponse.json({error:e1.message},{status:500});
  const bloques=(disp??[]).flatMap(d=>generarBloques(d.hora_inicio,d.hora_fin));
  const {data:citas,error:e2}=await supabaseAdmin.from("citas").select("hora").eq("fecha",fecha).eq("profesional_id",profesionalId).neq("estado","cancelada");
  if(e2) return NextResponse.json({error:e2.message},{status:500});
  const ocupadas=new Set((citas??[]).map(c=>c.hora.slice(0,5)));
  return NextResponse.json({disponibles:bloques.filter(h=>!ocupadas.has(h))});
}
