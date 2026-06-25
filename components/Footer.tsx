export default function Footer() {
  return (
    <footer className="bg-sage-dark text-cream mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm">
        <div>
          <p className="font-display text-xl mb-1">Crece TO</p>
          <p className="text-cream/80">Terapia ocupacional para niños y adultos</p>
        </div>
        <div className="text-cream/80">
          <p>Talca, Chile</p>
          <p>Atención presencial y visitas domiciliarias</p>
        </div>
      </div>
      <div className="text-center text-xs text-cream/60 pb-6">
        © {new Date().getFullYear()} Crece TO. Todos los derechos reservados.
      </div>
    </footer>
  );
}
