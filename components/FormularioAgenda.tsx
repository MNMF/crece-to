"use client";
import { useEffect, useState } from "react";
import { servicios } from "@/lib/servicios";
import { validarRut, formatearRut, limpiarRut } from "@/lib/rut";

type Profesional = { id: string; nombre: string; especialidad: string };
type Estado = "form" | "enviando" | "exito" | "error";

const PASOS = [
  "Selecciona Tratamiento",
  "Selecciona Profesional",
  "Selecciona día y hora",
  "Ingrese sus datos",
] as const;

function Stepper({ pasoActual }: { pasoActual: number }) {
  return (
    <div className="flex items-start mb-10">
      {PASOS.map((label, i) => {
        const numero = i + 1;
        const completado = numero < pasoActual;
        const activo = numero === pasoActual;
        return (
          <div key={label} className="flex-1 flex flex-col items-center relative">
            {i > 0 && (
              <div
                className={`absolute top-4 right-1/2 w-full h-0.5 -z-10 ${
                  numero <= pasoActual ? "bg-amber" : "bg-sage/30"
                }`}
              />
            )}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 transition-colors ${
                completado
                  ? "bg-amber text-cream"
                  : activo
                  ? "bg-amber text-cream ring-4 ring-amber/20"
                  : "bg-white border-2 border-sage/30 text-ink/40"
              }`}
            >
              {completado ? "✓" : numero}
            </div>
            <p
              className={`mt-2 text-xs text-center px-1 leading-tight ${
                activo ? "text-amber-dark font-medium" : completado ? "text-ink/70" : "text-ink/40"
              }`}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function FormularioAgenda({ profesionales }: { profesionales: Profesional[] }) {
  const [paso, setPaso] = useState(1);

  const [servicioSlug, setServicioSlug] = useState(servicios[0].slug);
  const [profesionalId, setProfesionalId] = useState(profesionales[0]?.id ?? "");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [cargandoHoras, setCargandoHoras] = useState(false);
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [rutValido, setRutValido] = useState<boolean | null>(null);
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState<Estado>("form");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    if (!fecha || !profesionalId) {
      setHorasDisponibles([]);
      return;
    }
    setCargandoHoras(true);
    setHora("");
    fetch(`/api/disponibilidad?fecha=${fecha}&profesionalId=${profesionalId}`)
      .then((r) => r.json())
      .then((d) => setHorasDisponibles(d.disponibles ?? []))
      .finally(() => setCargandoHoras(false));
  }, [fecha, profesionalId]);

  function handleRutChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = limpiarRut(e.target.value);
    if (raw.length <= 9) {
      setRut(raw.length > 1 ? formatearRut(raw) : raw);
      setRutValido(raw.length >= 7 ? validarRut(raw) : null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validarRut(rut)) {
      setMensajeError("El RUT ingresado no es válido.");
      setEstado("error");
      return;
    }
    setEstado("enviando");
    setMensajeError("");
    const res = await fetch("/api/agendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha,
        hora,
        servicio_slug: servicioSlug,
        profesional_id: profesionalId,
        nombre_paciente: nombre,
        rut_paciente: rut,
        telefono,
        email,
        notas,
      }),
    });
    if (res.ok) {
      setEstado("exito");
    } else {
      const d = await res.json();
      setMensajeError(d.error || "No se pudo agendar. Intenta de nuevo.");
      setEstado("error");
    }
  }

  const prof = profesionales.find((p) => p.id === profesionalId);
  const servicio = servicios.find((s) => s.slug === servicioSlug);

  if (estado === "exito") {
    return (
      <div className="bg-sand rounded-organic p-8 text-center">
        <h2 className="font-display text-2xl text-ink mb-2">¡Hora reservada!</h2>
        <p className="text-ink/80">
          Sesión de <strong>{servicio?.titulo}</strong> con <strong>{prof?.nombre}</strong> para el{" "}
          <strong>{fecha}</strong> a las <strong>{hora}</strong>. Te contactaremos al {telefono} para
          confirmar.
        </p>
      </div>
    );
  }

  const minFecha = new Date().toISOString().split("T")[0];
  const inputClass = "w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5";

  return (
    <div>
      <Stepper pasoActual={paso} />

      {/* Paso 1: Tratamiento */}
      {paso === 1 && (
        <div className="space-y-5">
          <div className="grid gap-3">
            {servicios.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setServicioSlug(s.slug)}
                className={`text-left rounded-organic border p-4 transition-colors ${
                  servicioSlug === s.slug
                    ? "border-amber bg-amber/10"
                    : "border-sage/30 bg-white hover:border-sage"
                }`}
              >
                <p className="font-medium text-ink">{s.titulo}</p>
                <p className="text-sm text-ink/60 mt-0.5">{s.resumen}</p>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaso(2)}
            className="w-full bg-amber text-cream py-3 rounded-full font-medium hover:bg-amber-dark transition-colors"
          >
            Continuar
          </button>
        </div>
      )}

      {/* Paso 2: Profesional */}
      {paso === 2 && (
        <div className="space-y-5">
          <div className="grid gap-3">
            {profesionales.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProfesionalId(p.id)}
                className={`text-left rounded-organic border p-4 transition-colors ${
                  profesionalId === p.id
                    ? "border-amber bg-amber/10"
                    : "border-sage/30 bg-white hover:border-sage"
                }`}
              >
                <p className="font-medium text-ink">{p.nombre}</p>
                <p className="text-sm text-ink/60 mt-0.5">{p.especialidad}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaso(1)}
              className="flex-1 border border-sage/40 text-ink py-3 rounded-full font-medium hover:bg-sand transition-colors"
            >
              Volver
            </button>
            <button
              type="button"
              disabled={!profesionalId}
              onClick={() => setPaso(3)}
              className="flex-1 bg-amber text-cream py-3 rounded-full font-medium hover:bg-amber-dark transition-colors disabled:opacity-50"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Paso 3: Día y hora */}
      {paso === 3 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input
              type="date"
              min={minFecha}
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hora</label>
            <div className="grid grid-cols-3 gap-2">
              {!fecha && <p className="col-span-3 text-sm text-ink/50">Elige una fecha primero.</p>}
              {fecha && cargandoHoras && <p className="col-span-3 text-sm text-ink/50">Cargando horas...</p>}
              {fecha && !cargandoHoras && horasDisponibles.length === 0 && (
                <p className="col-span-3 text-sm text-ink/50">Sin horas disponibles ese día.</p>
              )}
              {horasDisponibles.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHora(h)}
                  className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                    hora === h
                      ? "border-amber bg-amber text-cream"
                      : "border-sage/40 bg-white text-ink hover:border-sage"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaso(2)}
              className="flex-1 border border-sage/40 text-ink py-3 rounded-full font-medium hover:bg-sand transition-colors"
            >
              Volver
            </button>
            <button
              type="button"
              disabled={!fecha || !hora}
              onClick={() => setPaso(4)}
              className="flex-1 bg-amber text-cream py-3 rounded-full font-medium hover:bg-amber-dark transition-colors disabled:opacity-50"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Paso 4: Datos del paciente */}
      {paso === 4 && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-sand rounded-organic p-4 text-sm text-ink/70">
            <strong className="text-ink">{servicio?.titulo}</strong> con{" "}
            <strong className="text-ink">{prof?.nombre}</strong> — {fecha} a las {hora}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del paciente</label>
            <input required value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">RUT</label>
            <input
              required
              value={rut}
              onChange={handleRutChange}
              placeholder="12.345.678-9"
              className={`w-full rounded-lg border px-4 py-2.5 bg-white transition-colors ${
                rutValido === null ? "border-sage/40" : rutValido ? "border-sage" : "border-red-400"
              }`}
            />
            {rutValido === false && <p className="text-xs text-red-500 mt-1">RUT inválido</p>}
            {rutValido === true && <p className="text-xs text-sage-dark mt-1">RUT válido ✓</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input required value={telefono} onChange={(e) => setTelefono(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email (opcional)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notas (opcional)</label>
            <textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={3} className={inputClass} />
          </div>
          {estado === "error" && <p className="text-amber-dark text-sm">{mensajeError}</p>}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaso(3)}
              className="flex-1 border border-sage/40 text-ink py-3 rounded-full font-medium hover:bg-sand transition-colors"
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={estado === "enviando" || rutValido !== true}
              className="flex-1 bg-amber text-cream py-3 rounded-full font-medium hover:bg-amber-dark transition-colors disabled:opacity-50"
            >
              {estado === "enviando" ? "Reservando..." : "Confirmar hora"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
