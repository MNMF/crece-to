"use client";

import { useEffect, useState } from "react";
import { servicios } from "@/lib/servicios";

type Estado = "form" | "enviando" | "exito" | "error";

export default function FormularioAgenda() {
  const [servicioSlug, setServicioSlug] = useState(servicios[0].slug);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [cargandoHoras, setCargandoHoras] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState<Estado>("form");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    if (!fecha) {
      setHorasDisponibles([]);
      return;
    }
    setCargandoHoras(true);
    setHora("");
    fetch(`/api/disponibilidad?fecha=${fecha}`)
      .then((r) => r.json())
      .then((data) => setHorasDisponibles(data.disponibles ?? []))
      .finally(() => setCargandoHoras(false));
  }, [fecha]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    setMensajeError("");

    const res = await fetch("/api/agendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha,
        hora,
        servicio_slug: servicioSlug,
        nombre_paciente: nombre,
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

  if (estado === "exito") {
    return (
      <div className="bg-sand rounded-organic p-8 text-center">
        <h2 className="font-display text-2xl text-sage-dark mb-2">
          ¡Hora reservada!
        </h2>
        <p className="text-ink/80">
          Quedó agendada tu sesión para el {fecha} a las {hora}. Te
          contactaremos al {telefono} para confirmar.
        </p>
      </div>
    );
  }

  const minFecha = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>

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
        <p className="text-terracotta-dark text-sm">{mensajeError}</p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando" || !hora}
        className="w-full bg-terracotta text-cream py-3 rounded-full font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-50"
      >
        {estado === "enviando" ? "Reservando..." : "Confirmar hora"}
      </button>
    </form>
  );
}
