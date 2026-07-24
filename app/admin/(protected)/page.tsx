import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { servicios } from "@/lib/servicios";
import { getPerfilUsuario } from "@/lib/auth";
import { actualizarEstadoCita } from "../actions";

const estilosEstado: Record<string, string> = {
  pendiente: "bg-amber/20 text-amber-dark",
  confirmada: "bg-sage/20 text-sage-dark",
  cancelada: "bg-red-100 text-red-700",
  realizada: "bg-ink/10 text-ink/60",
};

export default async function AdminCitasPage() {
  const perfil = await getPerfilUsuario();

  let query = supabaseAdmin
    .from("citas")
    .select("*, profesionales(nombre)")
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  // Profesional solo ve sus citas
  if (perfil?.rol === "profesional") {
    query = query.eq("profesional_id", perfil.profesionalId);
  }

  const { data: citas } = await query;

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-6">Citas</h1>

      {(!citas || citas.length === 0) && (
        <p className="text-ink/50">Aún no hay citas agendadas.</p>
      )}

      <div className="space-y-3">
        {citas?.map((cita) => {
          const servicio = servicios.find((s) => s.slug === cita.servicio_slug);
          return (
            <div
              key={cita.id}
              className="bg-sand rounded-organic p-5 flex flex-wrap items-start justify-between gap-4"
            >
              <div>
                <p className="font-medium">
                  {cita.fecha} · {cita.hora.slice(0, 5)} —{" "}
                  {servicio?.titulo ?? cita.servicio_slug}
                </p>
                {perfil?.rol === "admin" && cita.profesionales && (
                  <p className="text-xs text-amber font-medium mt-0.5">
                    {(cita.profesionales as { nombre: string }).nombre}
                  </p>
                )}
                <p className="text-sm text-ink/70 mt-1">
                  {cita.nombre_paciente} · RUT {cita.rut_paciente} · {cita.telefono}
                  {cita.email ? ` · ${cita.email}` : ""}
                </p>
                {cita.notas && (
                  <p className="text-sm text-ink/60 mt-1">📝 {cita.notas}</p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    estilosEstado[cita.estado] ?? ""
                  }`}
                >
                  {cita.estado}
                </span>
                {cita.estado === "pendiente" && (
                  <>
                    <form action={actualizarEstadoCita.bind(null, cita.id, "confirmada")}>
                      <button className="text-xs bg-sage text-cream px-3 py-1.5 rounded-full hover:bg-sage-dark">
                        Confirmar
                      </button>
                    </form>
                    <form action={actualizarEstadoCita.bind(null, cita.id, "cancelada")}>
                      <button className="text-xs border border-amber text-amber-dark px-3 py-1.5 rounded-full hover:bg-amber/10">
                        Cancelar
                      </button>
                    </form>
                  </>
                )}
                {cita.estado === "confirmada" && (
                  <form action={actualizarEstadoCita.bind(null, cita.id, "realizada")}>
                    <button className="text-xs border border-ink/20 text-ink/60 px-3 py-1.5 rounded-full hover:bg-sand">
                      Marcar realizada
                    </button>
                  </form>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
