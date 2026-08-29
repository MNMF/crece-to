"use client";
import { useState } from "react";
import { agregarDisponibilidad } from "../../actions";

const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
type Profesional = { id: string; nombre: string };

export default function FormularioDisponibilidad({ profesionales, rolAdmin, profesionalIdFijo }: { profesionales: Profesional[] | null; rolAdmin: boolean; profesionalIdFijo?: string }) {
  const [diaSemana, setDiaSemana] = useState("1");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [profesionalId, setProfesionalId] = useState(profesionales?.[0]?.id ?? profesionalIdFijo ?? "");
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    const fd = new FormData();
    fd.append("profesional_id", profesionalId);
    fd.append("dia_semana", diaSemana);
    fd.append("hora_inicio", horaInicio);
    fd.append("hora_fin", horaFin);
    await agregarDisponibilidad(fd);
    setHoraInicio("");
    setHoraFin("");
    setExito(true);
    setCargando(false);
    setTimeout(() => setExito(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
      {rolAdmin && profesionales && (
        <select value={profesionalId} onChange={e => setProfesionalId(e.target.value)}
          className="rounded-lg border border-sage/40 bg-white px-3 py-2">
          {profesionales.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
      )}
      {!rolAdmin && <input type="hidden" value={profesionalIdFijo} readOnly />}
      <select value={diaSemana} onChange={e => setDiaSemana(e.target.value)}
        className="rounded-lg border border-sage/40 bg-white px-3 py-2">
        {dias.map((d, i) => <option key={i} value={String(i)}>{d}</option>)}
      </select>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink/60">Desde</label>
        <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} required
          className="rounded-lg border border-sage/40 bg-white px-3 py-2" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink/60">Hasta</label>
        <input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} required
          className="rounded-lg border border-sage/40 bg-white px-3 py-2" />
      </div>
      <button disabled={cargando}
        className="bg-amber text-cream px-5 py-2 rounded-full font-medium hover:bg-amber-dark disabled:opacity-50">
        {cargando ? "Guardando..." : "Agregar"}
      </button>
      {exito && <span className="text-sage-dark text-sm font-medium">✓ Bloque agregado</span>}
    </form>
  );
}
