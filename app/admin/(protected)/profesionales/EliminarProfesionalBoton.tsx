"use client";

import { useState, useTransition } from "react";
import { eliminarProfesional } from "../../actions";

/**
 * Botón "Eliminar" con modal de confirmación para un profesional.
 *
 * Cómo instalarlo:
 * 1. Copia este archivo a:
 *    app/admin/(protected)/profesionales/EliminarProfesionalBoton.tsx
 *    (mismo import relativo "../../actions" que ya usa page.tsx)
 * 2. En app/admin/(protected)/profesionales/page.tsx:
 *    - Reemplaza el import:
 *        import { agregarProfesional, eliminarProfesional } from "../../actions";
 *      por:
 *        import { agregarProfesional } from "../../actions";
 *        import EliminarProfesionalBoton from "./EliminarProfesionalBoton";
 *    - Reemplaza el <form action={eliminarProfesional.bind(null,p.id)}>...</form>
 *      por:
 *        <EliminarProfesionalBoton id={p.id} nombre={p.nombre} citasCount={citasPorProfesional[p.id] ?? 0} />
 *    - Agrega el cálculo de citasPorProfesional (ver instrucciones al final
 *      de este archivo / mensaje de Claude).
 */

interface Props {
  id: string;
  nombre: string;
  citasCount: number;
}

export default function EliminarProfesionalBoton({ id, nombre, citasCount }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function confirmar() {
    setError(null);
    startTransition(async () => {
      const resultado = await eliminarProfesional(id);
      if (resultado?.error) {
        setError(resultado.error);
      } else {
        setOpen(false);
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-amber-dark hover:underline"
      >
        Eliminar
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
          onClick={() => !pending && setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-organic bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg text-ink mb-2">
              ¿Eliminar a {nombre}?
            </h3>

            {citasCount > 0 ? (
              <p className="text-sm text-ink/70 mb-4">
                Este profesional tiene <strong>{citasCount}</strong>{" "}
                {citasCount === 1 ? "cita registrada" : "citas registradas"}.
                Se conservarán en el historial, pero quedarán sin profesional
                asignado. Sus bloques de horario se eliminarán
                automáticamente.
              </p>
            ) : (
              <p className="text-sm text-ink/70 mb-4">
                Sus bloques de horario asociados (si tiene) se eliminarán
                automáticamente. Esta acción no se puede deshacer.
              </p>
            )}

            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={pending}
                className="text-sm text-ink/60 hover:underline disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmar}
                disabled={pending}
                className="bg-amber text-cream px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-dark disabled:opacity-50"
              >
                {pending ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
