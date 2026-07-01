import Link from "next/link";
import { servicios } from "@/lib/servicios";

export default function ServiciosPage() {
  const infantil = servicios.filter((s) => s.poblacion === "Infantil");
  const adultos = servicios.filter((s) => s.poblacion === "Adultos");

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-sage-dark mb-2">Servicios</h1>
      <p className="text-ink/80 mb-12 max-w-xl">
        Cada plan de tratamiento se adapta a la persona, no al revés. Estos son
        los principales ámbitos de trabajo.
      </p>

      {[
        { titulo: "Población infantil", lista: infantil },
        { titulo: "Población adulta", lista: adultos },
      ].map((grupo) => (
        <div key={grupo.titulo} className="mb-12">
          <h2 className="font-display text-2xl text-amber mb-6">
            {grupo.titulo}
          </h2>
          <div className="space-y-6">
            {grupo.lista.map((s) => (
              <div key={s.slug} className="bg-sand rounded-organic p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl text-ink">{s.titulo}</h3>
                  <span className="text-xs text-ink/60">{s.duracionMin} min</span>
                </div>
                <p className="text-ink/75 mt-2">{s.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-10">
        <Link
          href="/agenda"
          className="bg-amber text-cream px-7 py-3 rounded-full font-medium hover:bg-amber-dark transition-colors inline-block"
        >
          Agendar una hora
        </Link>
      </div>
    </main>
  );
}
