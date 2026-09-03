import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getPerfilUsuario } from "@/lib/auth";
import VistaCitas from "./VistaCitas";

export default async function AdminCitasPage() {
  const perfil=await getPerfilUsuario();
  let q=supabaseAdmin.from("citas").select("*, profesionales(nombre)").order("fecha",{ascending:true}).order("hora",{ascending:true});
  if(perfil?.rol==="profesional") q=q.eq("profesional_id",perfil.profesionalId);
  const {data:citas}=await q;
  return <VistaCitas citas={citas??[]} esAdmin={perfil?.rol==="admin"} />;
}
