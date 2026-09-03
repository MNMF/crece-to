import Link from "next/link";
import { servicios } from "@/lib/servicios";
import { areas } from "@/lib/areas";
export default function ServiciosPage() {
  const infantil = servicios.filter(s => s.poblacion==="Infantil");
  const adultos = servicios.filter(s => s.poblacion==="Adultos");
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-ink mb-2">Servicios</h1>
      <p className="text-ink/70 mb-10 max-w-xl">Somos un centro terapéutico multidisciplinario en Talca. Estas son nuestras áreas de atención.</p>

      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {areas.map((a) => (
          <div key={a.slug} className="bg-sand rounded-organic p-6">
            <h2 className="font-display text-xl mb-2 text-ink">{a.nombre.replace("Atención ", "")}</h2>
            <p className="text-sm text-ink/70">{a.descripcion}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl text-ink mb-2">Detalle de Terapia Ocupacional</h2>
      <p className="text-ink/70 mb-10 max-w-xl">Cada plan de tratamiento se adapta a la persona. Estos son los principales ámbitos de trabajo dentro de Terapia Ocupacional.</p>
      {[{titulo:"Población infantil",lista:infantil},{titulo:"Población adulta",lista:adultos}].map(g=>(
        <div key={g.titulo} className="mb-12">
          <h2 className="font-display text-2xl text-amber mb-6">{g.titulo}</h2>
          <div className="space-y-6">
            {g.lista.map(s=>(
              <div key={s.slug} className="bg-sand rounded-organic p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl text-ink">{s.titulo}</h3>
                  <span className="text-xs text-ink/50">{s.duracionMin} min</span>
                </div>
                <p className="text-ink/70 mt-2">{s.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center mt-10">
        <Link href="/agenda" className="bg-amber text-cream px-7 py-3 rounded-full font-medium hover:bg-amber-dark transition-colors inline-block">Agendar una hora</Link>
      </div>
    </main>
  );
}
