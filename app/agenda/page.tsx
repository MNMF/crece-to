import FormularioAgenda from "@/components/FormularioAgenda";

export default function AgendaPage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-sage-dark mb-2 text-center">
        Agendar hora
      </h1>
      <p className="text-ink/80 text-center mb-10">
        Elige el servicio, fecha y hora que te acomode.
      </p>
      <FormularioAgenda />
    </main>
  );
}
