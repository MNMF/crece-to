import Link from "next/link";

export default function QuienesSomosPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="font-display text-4xl text-ink mb-2">Quiénes somos</h1>
      <p className="text-ink/70 mb-12 max-w-xl mx-auto">
        Somos un equipo de terapeutas ocupacionales comprometidos con acompañar
        cada etapa del desarrollo y la recuperación de nuestros pacientes.
      </p>

      {/* Misión y Visión */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-sand rounded-organic p-6">
          <h2 className="font-display text-2xl text-ink mb-3">
            <span className="text-amber">·</span> Misión
          </h2>
          <p className="text-ink/75 leading-relaxed">
            En Centro Terapéutico Anidar tenemos como misión brindar una
            atención integral, personalizada y de calidad a personas de todas
            las etapas del ciclo vital, desde la primera infancia hasta la
            adultez mayor, promoviendo su desarrollo, independencia,
            participación y bienestar, integrando distintas áreas de
            especialidad para responder a las necesidades particulares de cada
            persona y su familia.
          </p>
          <p className="text-ink/75 leading-relaxed mt-3">
            Nuestro compromiso es entregar intervenciones centradas en la
            persona, respetuosas de sus características, intereses,
            capacidades y contexto, favoreciendo procesos terapéuticos
            significativos que contribuyan a una mejor calidad de vida.
          </p>
        </div>

        <div className="bg-sand rounded-organic p-6">
          <h2 className="font-display text-2xl text-ink mb-3">
            <span className="text-amber">·</span> Visión
          </h2>
          <p className="text-ink/75 leading-relaxed">
            Ser un centro terapéutico que brinde una atención integral,
            humana, inclusiva y multidisciplinaria a lo largo de todo el ciclo
            vital, destacándonos por la calidad de las intervenciones y por el
            compromiso de nuestro equipo con cada persona y su entorno.
          </p>
        </div>
      </div>

      <div className="mt-12">
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
