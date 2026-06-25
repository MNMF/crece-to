import Link from "next/link";
import GrowthPath from "@/components/GrowthPath";
import { servicios } from "@/lib/servicios";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-terracotta font-medium tracking-wide uppercase text-sm mb-4">
          Terapia Ocupacional · Talca
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-sage-dark max-w-3xl mx-auto">
          Cada avance tiene su propio ritmo. Lo acompañamos paso a paso.
        </h1>
        <p className="mt-6 text-lg text-ink/80 max-w-xl mx-auto">
          Terapia ocupacional para niños y adultos: desarrollo, autonomía y
          calidad de vida en cada etapa.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/agenda"
            className="bg-terracotta text-cream px-7 py-3 rounded-full font-medium hover:bg-terracotta-dark transition-colors"
          >
            Agendar una hora
          </Link>
          <Link
            href="/servicios"
            className="border border-sage text-sage-dark px-7 py-3 rounded-full font-medium hover:bg-sand transition-colors"
          >
            Ver servicios
          </Link>
        </div>
        <GrowthPath className="mt-14 w-full max-w-2xl mx-auto" />
      </section>

      {/* Servicios resumen */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-sage-dark text-center mb-10">
          Áreas de trabajo
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <div
              key={s.slug}
              className="bg-sand rounded-organic p-6 hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-medium text-terracotta uppercase tracking-wide">
                {s.poblacion}
              </span>
              <h3 className="font-display text-xl mt-2 mb-2 text-ink">
                {s.titulo}
              </h3>
              <p className="text-sm text-ink/75">{s.resumen}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-2xl text-sage-dark mb-4">
          ¿Quieres conversar antes de agendar?
        </h2>
        <p className="text-ink/80 mb-6">
          Cuéntanos qué necesitas y te ayudamos a encontrar la mejor forma de empezar.
        </p>
        <Link
          href="/agenda"
          className="bg-sage text-cream px-7 py-3 rounded-full font-medium hover:bg-sage-dark transition-colors inline-block"
        >
          Reservar primera sesión
        </Link>
      </section>
    </main>
  );
}
