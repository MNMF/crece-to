"use client";
import { useMemo, useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import { areas } from "@/lib/areas";
import { actualizarEstadoCita } from "../actions";

type Cita = {
  id: string;
  fecha: string;
  hora: string;
  servicio_slug: string;
  nombre_paciente: string;
  edad: number | null;
  rut_paciente: string;
  telefono: string;
  email: string | null;
  notas: string | null;
  estado: "pendiente" | "confirmada" | "cancelada" | "realizada";
  profesionales: { nombre: string } | null;
};

const estilos: Record<string, string> = {
  pendiente: "bg-amber/20 text-amber-dark",
  confirmada: "bg-sage/20 text-sage-dark",
  cancelada: "bg-red-100 text-red-700",
  realizada: "bg-ink/10 text-ink/60",
};

const puntoEstado: Record<string, string> = {
  pendiente: "bg-amber",
  confirmada: "bg-sage",
  cancelada: "bg-red-400",
  realizada: "bg-ink/30",
};

function CitaCard({ c, esAdmin }: { c: Cita; esAdmin: boolean }) {
  const a = areas.find((a) => a.slug === c.servicio_slug);
  return (
    <div className="bg-sand rounded-organic p-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="font-medium">
          {c.fecha} · {c.hora.slice(0, 5)} — {a?.nombre ?? c.servicio_slug}
        </p>
        {esAdmin && c.profesionales && (
          <p className="text-xs text-amber font-medium mt-0.5">{c.profesionales.nombre}</p>
        )}
        <p className="text-sm text-ink/70 mt-1">
          {c.nombre_paciente}
          {c.edad ? ` (${c.edad} años)` : ""} · RUT {c.rut_paciente} · {c.telefono}
          {c.email ? ` · ${c.email}` : ""}
        </p>
        {c.notas && <p className="text-sm text-ink/60 mt-1">📝 {c.notas}</p>}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${estilos[c.estado] ?? ""}`}>{c.estado}</span>
        {c.estado === "pendiente" && (
          <>
            <form action={actualizarEstadoCita.bind(null, c.id, "confirmada")}>
              <button className="text-xs bg-sage text-cream px-3 py-1.5 rounded-full hover:bg-sage-dark">
                Confirmar
              </button>
            </form>
            <form action={actualizarEstadoCita.bind(null, c.id, "cancelada")}>
              <button className="text-xs border border-amber text-amber-dark px-3 py-1.5 rounded-full hover:bg-amber/10">
                Cancelar
              </button>
            </form>
          </>
        )}
        {c.estado === "confirmada" && (
          <form action={actualizarEstadoCita.bind(null, c.id, "realizada")}>
            <button className="text-xs border border-ink/20 text-ink/60 px-3 py-1.5 rounded-full">
              Marcar realizada
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Calendario({ citas, esAdmin }: { citas: Cita[]; esAdmin: boolean }) {
  const [mes, setMes] = useState(startOfMonth(new Date()));
  const [diaSeleccionado, setDiaSeleccionado] = useState(new Date());

  const citasPorDia = useMemo(() => {
    const mapa: Record<string, Cita[]> = {};
    citas.forEach((c) => {
      (mapa[c.fecha] ??= []).push(c);
    });
    return mapa;
  }, [citas]);

  const dias = useMemo(() => {
    const inicio = startOfWeek(startOfMonth(mes), { weekStartsOn: 1 });
    const fin = endOfWeek(endOfMonth(mes), { weekStartsOn: 1 });
    return eachDayOfInterval({ start: inicio, end: fin });
  }, [mes]);

  const claveDia = (d: Date) => format(d, "yyyy-MM-dd");
  const citasDelDiaSeleccionado = (citasPorDia[claveDia(diaSeleccionado)] ?? []).sort((a, b) =>
    a.hora.localeCompare(b.hora)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setMes((m) => subMonths(m, 1))}
          className="text-sm px-3 py-1.5 rounded-full border border-sage/40 hover:bg-sand"
        >
          ← Anterior
        </button>
        <p className="font-display text-lg text-ink capitalize">{format(mes, "MMMM yyyy", { locale: es })}</p>
        <button
          type="button"
          onClick={() => setMes((m) => addMonths(m, 1))}
          className="text-sm px-3 py-1.5 rounded-full border border-sage/40 hover:bg-sand"
        >
          Siguiente →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink/50 mb-1">
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dias.map((d) => {
          const clave = claveDia(d);
          const citasDia = citasPorDia[clave] ?? [];
          const enEsteMes = isSameMonth(d, mes);
          const seleccionado = isSameDay(d, diaSeleccionado);
          return (
            <button
              key={clave}
              type="button"
              onClick={() => setDiaSeleccionado(d)}
              className={`aspect-square rounded-lg p-1.5 flex flex-col items-center justify-start text-sm transition-colors ${
                seleccionado
                  ? "bg-amber text-cream"
                  : enEsteMes
                  ? "bg-white hover:bg-sand text-ink"
                  : "bg-white/40 text-ink/30 hover:bg-sand/50"
              } ${isToday(d) && !seleccionado ? "ring-2 ring-amber/50" : ""}`}
            >
              <span>{format(d, "d")}</span>
              {citasDia.length > 0 && (
                <span className="flex gap-0.5 mt-1 flex-wrap justify-center max-w-full">
                  {citasDia.slice(0, 4).map((c) => (
                    <span
                      key={c.id}
                      className={`w-1.5 h-1.5 rounded-full ${
                        seleccionado ? "bg-cream" : puntoEstado[c.estado] ?? "bg-ink/30"
                      }`}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-ink/70 mb-3 capitalize">
          {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es })}
        </p>
        {citasDelDiaSeleccionado.length === 0 && (
          <p className="text-sm text-ink/40">Sin citas agendadas este día.</p>
        )}
        <div className="space-y-3">
          {citasDelDiaSeleccionado.map((c) => (
            <CitaCard key={c.id} c={c} esAdmin={esAdmin} />
          ))}
        </div>
      </div>
    </div>
  );
}

function exportarCSV(citas: Cita[], esAdmin: boolean) {
  const encabezados = [
    "Fecha",
    "Hora",
    "Área",
    ...(esAdmin ? ["Profesional"] : []),
    "Paciente",
    "Edad",
    "RUT",
    "Teléfono",
    "Email",
    "Notas",
    "Estado",
  ];

  const escapar = (v: string) => `"${v.replace(/"/g, '""')}"`;

  const filas = citas.map((c) => {
    const a = areas.find((a) => a.slug === c.servicio_slug);
    const base = [
      c.fecha,
      c.hora.slice(0, 5),
      a?.nombre ?? c.servicio_slug,
      ...(esAdmin ? [c.profesionales?.nombre ?? ""] : []),
      c.nombre_paciente,
      c.edad?.toString() ?? "",
      c.rut_paciente,
      c.telefono,
      c.email ?? "",
      c.notas ?? "",
      c.estado,
    ];
    return base.map((v) => escapar(v)).join(",");
  });

  const csv = "\ufeff" + [encabezados.map(escapar).join(","), ...filas].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const hoy = format(new Date(), "yyyy-MM-dd");
  link.href = url;
  link.download = `citas-anidar-${hoy}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function VistaCitas({ citas, esAdmin }: { citas: Cita[]; esAdmin: boolean }) {
  const [vista, setVista] = useState<"lista" | "calendario">("lista");

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-3xl text-ink">Citas</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => exportarCSV(citas, esAdmin)}
            disabled={citas.length === 0}
            className="text-sm px-4 py-1.5 rounded-full border border-sage/40 text-ink/70 hover:bg-sand transition-colors disabled:opacity-40"
          >
            ⬇ Exportar CSV
          </button>
          <div className="flex gap-1 bg-sand rounded-full p-1 text-sm">
            <button
              type="button"
              onClick={() => setVista("lista")}
              className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
                vista === "lista" ? "bg-amber text-cream" : "text-ink/60 hover:text-ink"
              }`}
            >
              Lista
            </button>
            <button
              type="button"
              onClick={() => setVista("calendario")}
              className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
                vista === "calendario" ? "bg-amber text-cream" : "text-ink/60 hover:text-ink"
              }`}
            >
              Calendario
            </button>
          </div>
        </div>
      </div>

      {vista === "lista" ? (
        <>
          {citas.length === 0 && <p className="text-ink/50">Aún no hay citas agendadas.</p>}
          <div className="space-y-3">
            {citas.map((c) => (
              <CitaCard key={c.id} c={c} esAdmin={esAdmin} />
            ))}
          </div>
        </>
      ) : (
        <Calendario citas={citas} esAdmin={esAdmin} />
      )}
    </div>
  );
}
