export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm">
        <div>
          <p className="font-display text-xl tracking-widest mb-1">ANIDAR</p>
          <p className="text-cream/70 text-xs tracking-widest uppercase">Centro Terapéutico</p>
          <p className="text-cream/60 mt-2">Acompañamos cada etapa de tu vida.</p>
        </div>
        <div className="text-cream/70">
          <p>Talca, Chile</p>
          <p>Atención presencial y visitas domiciliarias</p>
        </div>
      </div>
      <div className="text-center text-xs text-cream/40 pb-6">
        © {new Date().getFullYear()} Anidar Centro Terapéutico. Todos los derechos reservados.
      </div>
    </footer>
  );
}
