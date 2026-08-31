import { MapPin, Navigation } from "lucide-react";

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
 * Nota: si tu proyecto no usa la librería "lucide-react", quita los
 * imports de íconos (MapPin, Navigation) y los <MapPin .../> / <Navigation .../>
 * del JSX, o instálala con: npm install lucide-react
 */

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
      className="w-full py-16 md:py-24 bg-white"
      aria-labelledby="ubicacion-titulo"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2
            id="ubicacion-titulo"
            className="text-3xl md:text-4xl font-semibold text-gray-900"
          >
            Nuestra ubicación
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Te esperamos en nuestro centro en pleno corazón de Talca, a pasos
            de la Plaza de Armas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Mapa embebido */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 min-h-[320px]">
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
          <div className="flex flex-col justify-center gap-6 p-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 text-lg">
                  Dirección
                </h3>
                <p className="text-gray-600 mt-1">{DIRECCION_COMPLETA}</p>
              </div>
            </div>

            <div>
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Cómo llegar
              </a>
            </div>

            <p className="text-sm text-gray-500">
              Edificio Plaza Talca cuenta con conserjería y ascensores. Al
              llegar al piso 12, la Oficina 1210 está señalizada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
