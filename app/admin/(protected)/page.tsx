import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { servicios } from "@/lib/servicios";
import { getPerfilUsuario } from "@/lib/auth";
import { actualizarEstadoCita } from "../actions";

const estilos:Record<string,string>={pendiente:"bg-amber/20 text-amber-dark",confirmada:"bg-sage/20 text-sage-dark",cancelada:"bg-red-100 text-red-700",realizada:"bg-ink/10 text-ink/60"};

export default async function AdminCitasPage() {
  const perfil=await getPerfilUsuario();
  let q=supabaseAdmin.from("citas").select("*, profesionales(nombre)").order("fecha",{ascending:true}).order("hora",{ascending:true});
  if(perfil?.rol==="profesional") q=q.eq("profesional_id",perfil.profesionalId);
  const {data:citas}=await q;
  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-6">Citas</h1>
      {(!citas||citas.length===0)&&<p className="text-ink/50">Aún no hay citas agendadas.</p>}
      <div className="space-y-3">
        {citas?.map(c=>{
          const s=servicios.find(s=>s.slug===c.servicio_slug);
          return (
            <div key={c.id} className="bg-sand rounded-organic p-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-medium">{c.fecha} · {c.hora.slice(0,5)} — {s?.titulo??c.servicio_slug}</p>
                {perfil?.rol==="admin"&&c.profesionales&&<p className="text-xs text-amber font-medium mt-0.5">{(c.profesionales as {nombre:string}).nombre}</p>}
                <p className="text-sm text-ink/70 mt-1">{c.nombre_paciente} · RUT {c.rut_paciente} · {c.telefono}{c.email?` · ${c.email}`:""}</p>
                {c.notas&&<p className="text-sm text-ink/60 mt-1">📝 {c.notas}</p>}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${estilos[c.estado]??""}`}>{c.estado}</span>
                {c.estado==="pendiente"&&<>
                  <form action={actualizarEstadoCita.bind(null,c.id,"confirmada")}><button className="text-xs bg-sage text-cream px-3 py-1.5 rounded-full hover:bg-sage-dark">Confirmar</button></form>
                  <form action={actualizarEstadoCita.bind(null,c.id,"cancelada")}><button className="text-xs border border-amber text-amber-dark px-3 py-1.5 rounded-full hover:bg-amber/10">Cancelar</button></form>
                </>}
                {c.estado==="confirmada"&&<form action={actualizarEstadoCita.bind(null,c.id,"realizada")}><button className="text-xs border border-ink/20 text-ink/60 px-3 py-1.5 rounded-full">Marcar realizada</button></form>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
