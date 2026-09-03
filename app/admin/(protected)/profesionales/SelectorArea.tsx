"use client";
import { actualizarAreaProfesional } from "../../actions";
import { areas } from "@/lib/areas";

export default function SelectorArea({ id, areaActual }: { id: string; areaActual: string | null }) {
  return (
    <form action={actualizarAreaProfesional} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <select
        name="area"
        defaultValue={areaActual ?? ""}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`text-xs rounded-full border px-3 py-1.5 bg-white ${
          areaActual ? "border-sage/40 text-ink" : "border-amber text-amber-dark"
        }`}
      >
        <option value="">Sin asignar</option>
        {areas.map((a) => (
          <option key={a.slug} value={a.slug}>
            {a.nombre}
          </option>
        ))}
      </select>
    </form>
  );
}
