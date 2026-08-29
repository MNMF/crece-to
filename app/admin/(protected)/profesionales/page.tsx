import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getPerfilUsuario } from "@/lib/auth";
import { redirect } from "next/navigation";
import { agregarProfesional, eliminarProfesional } from "../../actions";
export default async function ProfesionalesAdminPage() {
  const perfil=await getPerfilUsuario();
  if(perfil?.rol!=="admin") redirect("/admin");
  const {data:profesionales}=await supabaseAdmin.from("profesionales").select("*").order("orden");
  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-2">Profesionales</h1>
      <p className="text-ink/60 text-sm mb-6">Los profesionales registrados aparecen en la página "Quiénes somos" y en el formulario de agenda. </div>
      <div className="space-y-3 mb-10">
        {profesionales?.map(p=>(
          <div key={p.id} className="bg-sand rounded-organic p-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-medium text-ink">{p.nombre}</p>
              <p className="text-sm text-amber">{p.especialidad}</p>
              {p.bio&&<p className="text-sm text-ink/60 mt-1">{p.bio}</p>}
              {p.diplomados?.length>0&&<p className="text-xs text-ink/50 mt-1">{p.diplomados.join(" · ")}</p>}
            </div>
            <form action={eliminarProfesional.bind(null,p.id)}><button className="text-xs text-amber-dark hover:underline">Eliminar</button></form>
          </div>
        ))}
        {(!profesionales||profesionales.length===0)&&<p className="text-ink/40 text-sm">Sin profesionales registrados aún.</p>}
      </div>
      <h2 className="font-display text-xl text-ink mb-4">Agregar profesional</h2>
      <form action={agregarProfesional} className="space-y-4 max-w-lg">
        <div><label className="block text-sm font-medium mb-1">Nombre completo</label><input name="nombre" required className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"/></div>
        <div><label className="block text-sm font-medium mb-1">Especialidad</label><input name="especialidad" required placeholder="ej. Terapeuta Ocupacional Infantil" className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"/></div>
        <div><label className="block text-sm font-medium mb-1">Bio (opcional)</label><textarea name="bio" rows={3} className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"/></div>
        <div><label className="block text-sm font-medium mb-1">Diplomados / formación (uno por línea)</label><textarea name="diplomados" rows={3} placeholder={"Diplomado en Integración Sensorial\nPostítulo en Neurorrehabilitación"} className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5 text-sm"/></div>
        <button type="submit" className="bg-amber text-cream px-6 py-2.5 rounded-full font-medium hover:bg-amber-dark">Agregar profesional</button>
      </form>
    </div>
  );
}
