import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sand">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl leading-tight text-ink">
          <span className="text-amber-dark font-semibold tracking-widest">ANIDAR</span>
          <span className="block text-xs text-sage tracking-widest uppercase">Centro Terapéutico</span>
        </Link>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-ink/80">
          <Link href="/sobre-mi" className="hover:text-amber-dark transition-colors">
            Sobre mí
          </Link>
          <Link href="/servicios" className="hover:text-amber-dark transition-colors">
            Servicios
          </Link>
          <Link
            href="/agenda"
            className="bg-amber text-cream px-5 py-2 rounded-full hover:bg-amber-dark transition-colors"
          >
            Agendar hora
          </Link>
        </div>
        <Link
          href="/agenda"
          className="sm:hidden bg-amber text-cream px-4 py-2 rounded-full text-sm"
        >
          Agendar
        </Link>
      </nav>
    </header>
  );
}
