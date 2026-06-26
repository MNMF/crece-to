import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  agregarDisponibilidad,
  eliminarDisponibilidad,
  toggleDisponibilidad,
} from "../../actions";

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export default async function DisponibilidadPage() {
  const { data: bloques } = await supabaseAdmin
    .from("disponibilidad")
    .select("*")
    .order("dia_semana", { ascending: true })
    .order("hora_inicio", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-3xl text-sage-dark mb-2">Horarios</h1>
      <p className="text-ink/70 mb-6 text-sm">
        Estos bloques definen cuándo aparecen horas disponibles para agendar.
        Cada bloque se divide automáticamente en sesiones según la duración
        de cada servicio.
      </p>

      <div className="space-y-2 mb-8">
        {bloques?.map((b) => (
          <div
            key={b.id}
            className="bg-sand rounded-organic p-4 flex items-center justify-between gap-4"
          >
            <span className={!b.activo ? "text-ink/40 line-through" : ""}>
              {dias[b.dia_semana]} · {b.hora_inicio.slice(0, 5)} -{" "}
              {b.hora_fin.slice(0, 5)}
            </span>
            <div className="flex gap-2">
              <form
                action={toggleDisponibilidad.bind(null, b.id, b.activo)}
              >
                <button className="text-xs border border-sage text-sage-dark px-3 py-1.5 rounded-full hover:bg-sage/10">
                  {b.activo ? "Desactivar" : "Activar"}
                </button>
              </form>
              <form action={eliminarDisponibilidad.bind(null, b.id)}>
                <button className="text-xs text-terracotta-dark hover:underline px-2">
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-xl text-sage-dark mb-4">
        Agregar bloque
      </h2>
      <form action={agregarDisponibilidad} className="flex flex-wrap gap-3">
        <select
          name="dia_semana"
          required
          className="rounded-lg border border-sage/40 bg-white px-3 py-2"
        >
          {dias.map((dia, i) => (
            <option key={i} value={i}>
              {dia}
            </option>
          ))}
        </select>
        <input
          type="time"
          name="hora_inicio"
          required
          className="rounded-lg border border-sage/40 bg-white px-3 py-2"
        />
        <input
          type="time"
          name="hora_fin"
          required
          className="rounded-lg border border-sage/40 bg-white px-3 py-2"
        />
        <button className="bg-terracotta text-cream px-5 py-2 rounded-full font-medium hover:bg-terracotta-dark">
          Agregar
        </button>
      </form>
    </div>
  );
}
