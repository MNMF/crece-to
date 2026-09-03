import type { SVGProps } from "react";

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const TELEFONO_DISPLAY = "+56 9 3487 3036";
const WHATSAPP_NUMBER = "56934873036";
const DIRECCION_COMPLETA = "Calle 1 Sur con 1 Poniente N° 690, Edificio Plaza Talca, Piso 12, Oficina 1210, Talca";
const INSTAGRAM_USER = "centro.anidar";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-xl tracking-widest mb-1">ANIDAR</p>
          <p className="text-cream/70 text-xs tracking-widest uppercase">Centro Terapéutico</p>
          <p className="text-cream/60 mt-2">Acompañamos cada etapa de tu vida.</p>
        </div>

        <div className="space-y-2.5 text-cream/70">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-cream transition-colors">
            <PhoneIcon className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{TELEFONO_DISPLAY}</span>
          </a>
          <div className="flex items-start gap-2">
            <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{DIRECCION_COMPLETA}</span>
          </div>
          <p className="text-cream/50 text-xs pl-6">Atención presencial y visitas domiciliarias</p>
        </div>

        <div>
          <a
            href={`https://www.instagram.com/${INSTAGRAM_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cream/70 hover:text-cream transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@{INSTAGRAM_USER}</span>
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-cream/40 pb-6">
        © {new Date().getFullYear()} Anidar Centro Terapéutico. Todos los derechos reservados.
      </div>
    </footer>
  );
}
