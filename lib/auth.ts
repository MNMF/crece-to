import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type PerfilUsuario =
  | { rol: "admin"; profesionalId: null; nombre: string }
  | { rol: "profesional"; profesionalId: string; nombre: string };

export async function getPerfilUsuario(): Promise<PerfilUsuario | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Si tiene un registro en profesionales → es un profesional del centro
  const { data: profesional } = await supabaseAdmin
    .from("profesionales")
    .select("id, nombre")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profesional) {
    return {
      rol: "profesional",
      profesionalId: profesional.id,
      nombre: profesional.nombre,
    };
  }

  // Si no tiene registro → es administrador/a
  return { rol: "admin", profesionalId: null, nombre: "Administradora" };
}
