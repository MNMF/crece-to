"use client";

import { useEffect, useState } from "react";
import { servicios } from "@/lib/servicios";
import { validarRut, formatearRut, limpiarRut } from "@/lib/rut";

type Profesional = { id: string; nombre: string; especialidad: string };
type Estado = "form" | "enviando" | "exito" | "error";

export default function FormularioAgenda({
  profesionales,
}: {
  profesionales: Profesional[];
}) {
  const [profesionalId, setProfesionalId] = useState(
    profesionales[0]?.id ?? ""
  );
  const [servicioSlug, setServicioSlug] = useState(servicios[0].slug);
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
      .then((data) => setHorasDisponibles(data.disponibles ?? []))
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
      const data = await res.json();
      setMensajeError(data.error || "No se pudo agendar. Intenta de nuevo.");
      setEstado("error");
    }
  }

  const profesionalSeleccionado = profesionales.find(
    (p) => p.id === profesionalId
  );

  if (estado === "exito") {
    return (
      <div className="bg-sand rounded-organic p-8 text-center">
        <h2 className="font-display text-2xl text-ink mb-2">¡Hora reservada!</h2>
        <p className="text-ink/80">
          Quedó agendada tu sesión con{" "}
          <strong>{profesionalSeleccionado?.nombre}</strong> para el{" "}
          <strong>{fecha}</strong> a las <strong>{hora}</strong>.
          Te contactaremos al {telefono} para confirmar.
        </p>
      </div>
    );
  }

  const minFecha = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Profesional */}
      <div>
        <label className="block text-sm font-medium mb-1">Profesional</label>
        <select
          value={profesionalId}
          onChange={(e) => { setProfesionalId(e.target.value); setFecha(""); }}
          className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"
        >
          {profesionales.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — {p.especialidad}
            </option>
          ))}
        </select>
      </div>

      {/* Servicio */}
      <div>
        <label className="block text-sm font-medium mb-1">Servicio</label>
        <select
          value={servicioSlug}
          onChange={(e) => setServicioSlug(e.target.value)}
          className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"
        >
          {servicios.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha y hora */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha</label>
          <input
            type="date"
            min={minFecha}
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hora</label>
          <select
            required
            disabled={!fecha || cargandoHoras}
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5 disabled:opacity-50"
          >
            <option value="">
              {cargandoHoras
                ? "Cargando..."
                : !fecha
                ? "Elige una fecha"
                : horasDisponibles.length === 0
                ? "Sin horas disponibles"
                : "Selecciona"}
            </option>
            {horasDisponibles.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Datos del paciente */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre del paciente
        </label>
        <input
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">RUT</label>
        <input
          required
          value={rut}
          onChange={handleRutChange}
          placeholder="12.345.678-9"
          className={`w-full rounded-lg border px-4 py-2.5 bg-white transition-colors ${
            rutValido === null
              ? "border-sage/40"
              : rutValido
              ? "border-sage"
              : "border-terracotta"
          }`}
        />
        {rutValido === false && (
          <p className="text-xs text-terracotta mt-1">RUT inválido</p>
        )}
        {rutValido === true && (
          <p className="text-xs text-sage-dark mt-1">RUT válido ✓</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Email (opcional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Notas (opcional)
        </label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-sage/40 bg-white px-4 py-2.5"
        />
      </div>

      {estado === "error" && (
        <p className="text-amber-dark text-sm">{mensajeError}</p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando" || !hora || rutValido !== true}
        className="w-full bg-amber text-cream py-3 rounded-full font-medium hover:bg-amber-dark transition-colors disabled:opacity-50"
      >
        {estado === "enviando" ? "Reservando..." : "Confirmar hora"}
      </button>
    </form>
  );
}
