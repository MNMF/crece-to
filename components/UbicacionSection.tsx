import type { SVGProps } from "react";

/**
 * Sección "Ubicación" para la landing de Anidar Centro Terapéutico.
 *
 * Cómo agregarla a tu proyecto:
 * 1. Copia este archivo a: components/UbicacionSection.tsx
 * 2. En tu página principal (por ejemplo app/page.tsx), impórtalo:
 *      import UbicacionSection from "@/components/UbicacionSection";
 *    y agrégalo donde quieras que aparezca, por ejemplo después de
 *    la sección de servicios o antes del footer:
 *      <UbicacionSection />
 *
 */

// Íconos SVG inline (sin dependencias externas)
function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function NavigationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

const DIRECCION_COMPLETA =
  "Calle 1 Sur con 1 Poniente N° 690, Edificio Plaza Talca, Piso 12, Oficina 1210, Talca";

// Link de "Cómo llegar" (abre Google Maps con direcciones)
const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Edificio+Plaza+Talca,+Calle+1+Sur+690,+Talca,+Chile";

// URL del mapa embebido (iframe). Este embed público no requiere API key.
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Edificio+Plaza+Talca,+Calle+1+Sur+690,+Talca,+Chile&output=embed";

export default function UbicacionSection() {
  return (
    <section
      id="ubicacion"
      className="max-w-5xl mx-auto px-6 py-16"
      aria-labelledby="ubicacion-titulo"
    >
      <h2
        id="ubicacion-titulo"
        className="font-display text-3xl text-ink text-center mb-4"
      >
        Nuestra ubicación
      </h2>
      <p className="text-ink/70 text-center max-w-2xl mx-auto mb-10">
        Te esperamos en nuestro centro en pleno corazón de Talca, a pasos de
        la Plaza de Armas.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Mapa embebido */}
        <div className="rounded-organic overflow-hidden shadow-md min-h-[320px]">
          <iframe
            title="Ubicación Anidar Centro Terapéutico"
            src={GOOGLE_MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "320px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Información + botón */}
        <div className="bg-sand rounded-organic p-6 flex flex-col justify-center gap-6">
          <div className="flex items-start gap-3">
            <MapPinIcon className="w-6 h-6 text-amber shrink-0 mt-1" />
            <div>
              <h3 className="font-display text-lg text-ink mb-1">
                Dirección
              </h3>
              <p className="text-sm text-ink/70">{DIRECCION_COMPLETA}</p>
            </div>
          </div>

          <div>
            <a
              href={GOOGLE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sage text-cream px-7 py-3 rounded-full font-medium hover:bg-sage-dark transition-colors"
            >
              <NavigationIcon className="w-5 h-5" />
              Cómo llegar
            </a>
          </div>

          <p className="text-xs text-ink/60">
            Edificio Plaza Talca cuenta con conserjería y ascensores. Al
            llegar al piso 12, la Oficina 1210 está señalizada.
          </p>
        </div>
      </div>
    </section>
  );
}
