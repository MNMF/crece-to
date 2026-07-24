import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Esta ruta es llamada automáticamente por Vercel Cron cada día.
// Solo hace una consulta mínima para que Supabase no considere
// el proyecto inactivo y lo pause.
export async function GET(req: NextRequest) {
  // Verificar que la llamada viene de Vercel Cron (no de alguien externo)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabaseAdmin
    .from("profesionales")
    .select("id")
    .limit(1);

  if (error) {
    console.error("[keepalive] Error al consultar Supabase:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  console.log("[keepalive] Supabase activo —", new Date().toISOString());
  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
