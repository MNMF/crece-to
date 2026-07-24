"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createClient } from "@/lib/supabase/server";
import { getPerfilUsuario } from "@/lib/auth";

async function verificarSesion() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");
}

export async function actualizarEstadoCita(
  id: string,
  estado: "confirmada" | "cancelada" | "realizada"
) {
  await verificarSesion();
  await supabaseAdmin.from("citas").update({ estado }).eq("id", id);
  revalidatePath("/admin");
}

export async function agregarDisponibilidad(formData: FormData) {
  await verificarSesion();
  const profesionalId = formData.get("profesional_id") as string;
  const diaSemana = Number(formData.get("dia_semana"));
  const horaInicio = formData.get("hora_inicio") as string;
  const horaFin = formData.get("hora_fin") as string;

  await supabaseAdmin.from("disponibilidad").insert({
    profesional_id: profesionalId,
    dia_semana: diaSemana,
    hora_inicio: horaInicio,
    hora_fin: horaFin,
  });
  revalidatePath("/admin/disponibilidad");
}

export async function eliminarDisponibilidad(id: string) {
  await verificarSesion();
  await supabaseAdmin.from("disponibilidad").delete().eq("id", id);
  revalidatePath("/admin/disponibilidad");
}

export async function toggleDisponibilidad(id: string, activo: boolean) {
  await verificarSesion();
  await supabaseAdmin
    .from("disponibilidad")
    .update({ activo: !activo })
    .eq("id", id);
  revalidatePath("/admin/disponibilidad");
}

export async function agregarProfesional(formData: FormData) {
  const perfil = await getPerfilUsuario();
  if (!perfil || perfil.rol !== "admin") redirect("/admin");

  const nombre = formData.get("nombre") as string;
  const especialidad = formData.get("especialidad") as string;
  const bio = formData.get("bio") as string;
  const diplomadosRaw = formData.get("diplomados") as string;
  const diplomados = diplomadosRaw
    ? diplomadosRaw.split("\n").map((d) => d.trim()).filter(Boolean)
    : [];

  await supabaseAdmin.from("profesionales").insert({
    nombre,
    especialidad,
    bio: bio || null,
    diplomados,
  });
  revalidatePath("/admin/profesionales");
  revalidatePath("/quienes-somos");
}

export async function eliminarProfesional(id: string) {
  const perfil = await getPerfilUsuario();
  if (!perfil || perfil.rol !== "admin") redirect("/admin");
  await supabaseAdmin.from("profesionales").delete().eq("id", id);
  revalidatePath("/admin/profesionales");
  revalidatePath("/quienes-somos");
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
