"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createClient } from "@/lib/supabase/server";
import { getPerfilUsuario } from "@/lib/auth";

async function verificarSesion() {
  const s=await createClient(); const {data}=await s.auth.getUser();
  if(!data.user) redirect("/admin/login");
}

export async function actualizarEstadoCita(id:string,estado:"confirmada"|"cancelada"|"realizada") {
  await verificarSesion();
  await supabaseAdmin.from("citas").update({estado}).eq("id",id);
  revalidatePath("/admin");
}

export async function agregarDisponibilidad(formData:FormData) {
  await verificarSesion();
  await supabaseAdmin.from("disponibilidad").insert({
    profesional_id:formData.get("profesional_id") as string,
    dia_semana:Number(formData.get("dia_semana")),
    hora_inicio:formData.get("hora_inicio") as string,
    hora_fin:formData.get("hora_fin") as string,
  });
  revalidatePath("/admin/disponibilidad");
}

export async function eliminarDisponibilidad(id:string) {
  await verificarSesion();
  await supabaseAdmin.from("disponibilidad").delete().eq("id",id);
  revalidatePath("/admin/disponibilidad");
}

export async function toggleDisponibilidad(id:string,activo:boolean) {
  await verificarSesion();
  await supabaseAdmin.from("disponibilidad").update({activo:!activo}).eq("id",id);
  revalidatePath("/admin/disponibilidad");
}

export async function agregarProfesional(formData:FormData) {
  const perfil=await getPerfilUsuario();
  if(!perfil||perfil.rol!=="admin") redirect("/admin");
  const diplomadosRaw=formData.get("diplomados") as string;
  const diplomados=diplomadosRaw?diplomadosRaw.split("\n").map(d=>d.trim()).filter(Boolean):[];
  await supabaseAdmin.from("profesionales").insert({
    nombre:formData.get("nombre") as string,
    especialidad:formData.get("especialidad") as string,
    area:(formData.get("area") as string)||null,
    bio:(formData.get("bio") as string)||null,
    diplomados,
  });
  revalidatePath("/admin/profesionales"); revalidatePath("/quienes-somos"); revalidatePath("/agenda");
}

export async function actualizarAreaProfesional(formData:FormData) {
  const perfil=await getPerfilUsuario();
  if(!perfil||perfil.rol!=="admin") redirect("/admin");
  const id=formData.get("id") as string;
  const area=(formData.get("area") as string)||null;
  await supabaseAdmin.from("profesionales").update({area}).eq("id",id);
  revalidatePath("/admin/profesionales"); revalidatePath("/agenda");
}

export async function eliminarProfesional(id:string) {
  const perfil=await getPerfilUsuario();
  if(!perfil||perfil.rol!=="admin") redirect("/admin");
  const {error}=await supabaseAdmin.from("profesionales").delete().eq("id",id);
  if(error){
    console.error("Error al eliminar profesional:",error);
    return {error:"No se pudo eliminar. Intenta de nuevo o revisa los logs."};
  }
  revalidatePath("/admin/profesionales"); revalidatePath("/quienes-somos");
  return {error:null};
}

export async function eliminarCita(id:string) {
  const perfil=await getPerfilUsuario();
  if(!perfil) redirect("/admin/login");
  let q=supabaseAdmin.from("citas").delete().eq("id",id);
  if(perfil.rol==="profesional") q=q.eq("profesional_id",perfil.profesionalId);
  const {data,error}=await q.select("id");
  if(error){
    console.error("Error al eliminar cita:",error);
    return {error:"No se pudo eliminar. Intenta de nuevo."};
  }
  if(!data||data.length===0){
    return {error:"No se encontró la cita, o no tienes permiso para eliminarla."};
  }
  revalidatePath("/admin");
  return {error:null};
}

export async function cerrarSesion() {
  const s=await createClient(); await s.auth.signOut(); redirect("/admin/login");
}
