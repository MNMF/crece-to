import { supabaseAdmin } from "@/lib/supabaseAdmin";
import FormularioAgenda from "@/components/FormularioAgenda";
export default async function AgendaPage() {
  const { data: profesionales } = await supabaseAdmin.from("profesionales").select("id,nombre,especialidad").eq("activo",true).order("orden");
  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-ink mb-2 text-center">Agendar hora</h1>
      <p className="text-ink/70 text-center mb-10">Elige tu profesional, servicio, fecha y hora.</p>
      {(!profesionales||profesionales.length===0)
        ? <p className="text-center text-ink/50">Horarios no disponibles por el momento. Contáctanos directamente.</p>
        : <FormularioAgenda profesionales={profesionales}/>}
    </main>
  );
}
