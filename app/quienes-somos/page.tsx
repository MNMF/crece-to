import { supabaseAdmin } from "@/lib/supabaseAdmin";
import Link from "next/link";
export default async function QuienesSomosPage() {
  const { data: profesionales } = await supabaseAdmin.from("profesionales").select("id,nombre,especialidad,bio,diplomados").eq("activo",true).order("orden");
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-ink mb-2">Quiénes somos</h1>
      <p className="text-ink/70 mb-12 max-w-xl">Somos un equipo de terapeutas ocupacionales comprometidos con acompañar cada etapa del desarrollo y la recuperación de nuestros pacientes.</p>
      {(!profesionales||profesionales.length===0)&&<p className="text-ink/50">Información del equipo próximamente.</p>}
      <div className="space-y-8">
        {profesionales?.map(p=>(
          <div key={p.id} className="bg-sand rounded-organic p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h2 className="font-display text-2xl text-ink">{p.nombre}</h2>
              <span className="text-sm text-amber font-medium">{p.especialidad}</span>
            </div>
            {p.bio&&<p className="text-ink/75 mt-2">{p.bio}</p>}
            {p.diplomados&&p.diplomados.length>0&&(
              <div className="mt-4">
                <p className="text-xs font-medium text-ink/50 uppercase tracking-wide mb-2">Formación complementaria</p>
                <ul className="space-y-1">
                  {p.diplomados.map((d:string,i:number)=>(
                    <li key={i} className="text-sm text-ink/70 flex gap-2"><span className="text-amber">·</span>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/agenda" className="bg-amber text-cream px-7 py-3 rounded-full font-medium hover:bg-amber-dark transition-colors inline-block">Agendar una hora</Link>
      </div>
    </main>
  );
}
