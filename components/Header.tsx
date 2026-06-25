import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sand">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl text-sage-dark">
          Crece <span className="text-terracotta">TO</span>
        </Link>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-ink/80">
          <Link href="/sobre-mi" className="hover:text-sage-dark transition-colors">
            Sobre mí
          </Link>
          <Link href="/servicios" className="hover:text-sage-dark transition-colors">
            Servicios
          </Link>
          <Link
            href="/agenda"
            className="bg-terracotta text-cream px-5 py-2 rounded-full hover:bg-terracotta-dark transition-colors"
          >
            Agendar hora
          </Link>
        </div>
        <Link
          href="/agenda"
          className="sm:hidden bg-terracotta text-cream px-4 py-2 rounded-full text-sm"
        >
          Agendar
        </Link>
      </nav>
    </header>
  );
}
