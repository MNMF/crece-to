export default function TopBar() {
  return (
    <div className="bg-sage-dark text-cream text-xs sm:text-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 text-center">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>
            Lunes a sábado · 09:00–13:00 y 14:00–20:00
          </span>
        </div>

        <span className="hidden sm:inline text-cream/40">|</span>

        
          href="https://www.google.com/maps/search/?api=1&query=Calle+1+Sur+690+Edificio+Plaza+Talca+Piso+12+Oficina+1210+Talca"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-amber transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 shrink-0"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Edificio Plaza Talca, Piso 12</span>
        </a>
      </div>
    </div>
  );
}
