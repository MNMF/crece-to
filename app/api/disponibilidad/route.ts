import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Genera bloques de 50 min dentro de cada rango de disponibilidad
function generarBloques(horaInicio: string, horaFin: string, duracionMin = 50) {
  const bloques: string[] = [];
  const [hI, mI] = horaInicio.split(":").map(Number);
  const [hF, mF] = horaFin.split(":").map(Number);
  let cursor = hI * 60 + mI;
  const fin = hF * 60 + mF;
  while (cursor + duracionMin <= fin) {
    const h = Math.floor(cursor / 60).toString().padStart(2, "0");
    const m = (cursor % 60).toString().padStart(2, "0");
    bloques.push(`${h}:${m}`);
    cursor += duracionMin;
  }
  return bloques;
}

export async function GET(req: NextRequest) {
  const fecha = req.nextUrl.searchParams.get("fecha"); // YYYY-MM-DD
  if (!fecha) {
    return NextResponse.json({ error: "Falta parámetro fecha" }, { status: 400 });
  }

  const diaSemana = new Date(fecha + "T00:00:00").getDay();

  const { data: disponibilidad, error: errDisp } = await supabaseAdmin
    .from("disponibilidad")
    .select("hora_inicio, hora_fin")
    .eq("dia_semana", diaSemana)
    .eq("activo", true);

  if (errDisp) {
    return NextResponse.json({ error: errDisp.message }, { status: 500 });
  }

  const todosBloques = (disponibilidad ?? []).flatMap((d) =>
    generarBloques(d.hora_inicio, d.hora_fin)
  );

  const { data: citasDelDia, error: errCitas } = await supabaseAdmin
    .from("citas")
    .select("hora")
    .eq("fecha", fecha)
    .neq("estado", "cancelada");

  if (errCitas) {
    return NextResponse.json({ error: errCitas.message }, { status: 500 });
  }

  const horasOcupadas = new Set((citasDelDia ?? []).map((c) => c.hora.slice(0, 5)));
  const disponibles = todosBloques.filter((h) => !horasOcupadas.has(h));

  return NextResponse.json({ disponibles });
}
