import Link from "next/link";
import { areas } from "@/lib/areas";
import UbicacionSection from "@/components/UbicacionSection";

export default function Home() {
  return (
    <main>
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-amber font-medium tracking-widest uppercase text-sm mb-4">
          Centro Terapéutico en Talca
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-ink max-w-3xl mx-auto">
          Acompañamos cada etapa de tu vida.
        </h1>
        <p className="mt-6 text-lg text-ink/70 max-w-xl mx-auto">
          Fonoaudiología, Terapia Ocupacional, Psicología y Psicopedagogía para niños, adolescentes y adultos, en un mismo centro en Talca.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link href="/agenda" className="bg-amber text-cream px-7 py-3 rounded-full font-medium hover:bg-amber-dark transition-colors">
            Agendar una hora
          </Link>
          <Link href="/servicios" className="border border-amber/40 text-ink px-7 py-3 rounded-full font-medium hover:bg-sand transition-colors">
            Ver servicios
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-ink text-center mb-2">Nuestras áreas de atención</h2>
        <p className="text-ink/60 text-center max-w-xl mx-auto mb-10">
          Un equipo multidisciplinario trabajando juntos por tu bienestar y el de tu familia.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {areas.map((a) => (
            <div key={a.slug} className="bg-sand rounded-organic p-6 hover:shadow-md transition-shadow">
              <h3 className="font-display text-xl mb-2 text-ink">{a.nombre.replace("Atención ", "")}</h3>
              <p className="text-sm text-ink/70">{a.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
     <UbicacionSection />
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-2xl text-ink mb-4">¿Quieres conversar antes de agendar?</h2>
        <p className="text-ink/70 mb-6">Cuéntanos qué necesitas y te ayudamos a encontrar la mejor forma de empezar.</p>
        <Link href="/agenda" className="bg-sage text-cream px-7 py-3 rounded-full font-medium hover:bg-sage-dark transition-colors inline-block">
          Reservar primera sesión
        </Link>
      </section>
    </main>
  );
}
