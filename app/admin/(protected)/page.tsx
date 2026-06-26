import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { servicios } from "@/lib/servicios";
import { actualizarEstadoCita } from "../actions";

const estilosEstado: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-800",
  confirmada: "bg-sage/20 text-sage-dark",
  cancelada: "bg-red-100 text-red-700",
  realizada: "bg-ink/10 text-ink/70",
};

export default async function AdminCitasPage() {
  const { data: citas } = await supabaseAdmin
    .from("citas")
    .select("*")
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-3xl text-sage-dark mb-6">Citas</h1>

      {(!citas || citas.length === 0) && (
        <p className="text-ink/60">Aún no hay citas agendadas.</p>
      )}

      <div className="space-y-3">
        {citas?.map((cita) => {
          const servicio = servicios.find(
            (s) => s.slug === cita.servicio_slug
          );
          return (
            <div
              key={cita.id}
              className="bg-sand rounded-organic p-5 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium">
                  {cita.fecha} · {cita.hora.slice(0, 5)} —{" "}
                  {servicio?.titulo ?? cita.servicio_slug}
                </p>
                <p className="text-sm text-ink/70">
                  {cita.nombre_paciente} · {cita.telefono}
                  {cita.email ? ` · ${cita.email}` : ""}
                </p>
                {cita.notas && (
                  <p className="text-sm text-ink/60 mt-1">📝 {cita.notas}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    estilosEstado[cita.estado] ?? ""
                  }`}
                >
                  {cita.estado}
                </span>

                {cita.estado === "pendiente" && (
                  <>
                    <form
                      action={actualizarEstadoCita.bind(
                        null,
                        cita.id,
                        "confirmada"
                      )}
                    >
                      <button className="text-xs bg-sage text-cream px-3 py-1.5 rounded-full hover:bg-sage-dark">
                        Confirmar
                      </button>
                    </form>
                    <form
                      action={actualizarEstadoCita.bind(
                        null,
                        cita.id,
                        "cancelada"
                      )}
                    >
                      <button className="text-xs border border-terracotta text-terracotta-dark px-3 py-1.5 rounded-full hover:bg-terracotta/10">
                        Cancelar
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
