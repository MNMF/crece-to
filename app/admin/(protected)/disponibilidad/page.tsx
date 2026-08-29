import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getPerfilUsuario } from "@/lib/auth";
import { agregarDisponibilidad, eliminarDisponibilidad, toggleDisponibilidad } from "../../actions";
const dias=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
export default async function DisponibilidadPage() {
  const perfil=await getPerfilUsuario();
  let q=supabaseAdmin.from("disponibilidad").select("*, profesionales(nombre)").order("dia_semana").order("hora_inicio");
  if(perfil?.rol==="profesional") q=q.eq("profesional_id",perfil.profesionalId);
  const {data:bloques}=await q;
  const {data:profs}=perfil?.rol==="admin"?await supabaseAdmin.from("profesionales").select("id,nombre").eq("activo",true).order("orden"):{data:null};
  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-2">Horarios de atención</h1>
      <p className="text-ink/60 text-sm mb-6">Cada bloque define cuándo aparecen horas disponibles para agendar.</p>
      <div className="space-y-2 mb-10">
        {bloques?.map(b=>(
          <div key={b.id} className="bg-sand rounded-organic p-4 flex items-center justify-between gap-4">
            <div>
              {perfil?.rol==="admin"&&b.profesionales&&<p className="text-xs text-amber font-medium mb-0.5">{(b.profesionales as {nombre:string}).nombre}</p>}
              <span className={!b.activo?"text-ink/40 line-through":""}>{dias[b.dia_semana]} · {b.hora_inicio.slice(0,5)} – {b.hora_fin.slice(0,5)}</span>
            </div>
            <div className="flex gap-2">
              <form action={toggleDisponibilidad.bind(null,b.id,b.activo)}><button className="text-xs border border-sage text-sage-dark px-3 py-1.5 rounded-full hover:bg-sage/10">{b.activo?"Desactivar":"Activar"}</button></form>
              <form action={eliminarDisponibilidad.bind(null,b.id)}><button className="text-xs text-amber-dark hover:underline px-2">Eliminar</button></form>
            </div>
          </div>
        ))}
        {(!bloques||bloques.length===0)&&<p className="text-ink/40 text-sm">Sin bloques configurados aún.</p>}
      </div>
      <h2 className="font-display text-xl text-ink mb-4">Agregar bloque</h2>
      <form action={agregarDisponibilidad} className="flex flex-wrap gap-3 items-end">
        {perfil?.rol==="admin"&&profs&&<select name="profesional_id" required className="rounded-lg border border-sage/40 bg-white px-3 py-2">{profs.map(p=><option key={p.id} value={p.id}>{p.nombre}</option>)}</select>}
        {perfil?.rol==="profesional"&&<input type="hidden" name="profesional_id" value={perfil.profesionalId}/>}
        <select name="dia_semana" required className="rounded-lg border border-sage/40 bg-white px-3 py-2">{dias.map((d,i)=><option key={i} value={i}>{d}</option>)}</select>
        <input type="time" name="hora_inicio" required className="rounded-lg border border-sage/40 bg-white px-3 py-2"/>
        <input type="time" name="hora_fin" required className="rounded-lg border border-sage/40 bg-white px-3 py-2"/>
        <button className="bg-amber text-cream px-5 py-2 rounded-full font-medium hover:bg-amber-dark">Agregar</button>
      </form>
    </div>
  );
}
