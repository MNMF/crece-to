"use client";

import { useState, useTransition } from "react";
import { eliminarCita } from "../actions";

interface Props {
  id: string;
  descripcion: string;
}

export default function EliminarCitaBoton({ id, descripcion }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function confirmar() {
    setError(null);
    startTransition(async () => {
      const resultado = await eliminarCita(id);
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
        className="text-xs text-ink/40 hover:text-red-600 hover:underline"
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
            <h3 className="font-display text-lg text-ink mb-2">¿Eliminar esta cita?</h3>
            <p className="text-sm text-ink/70 mb-4">
              {descripcion}. Esta acción no se puede deshacer.
            </p>

            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

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
                className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-700 disabled:opacity-50"
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
