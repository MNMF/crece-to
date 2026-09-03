// Datos estructurados (JSON-LD) para que Google entienda que Anidar
// es un centro terapéutico local: nombre, dirección, teléfono, etc.
// Esto ayuda a aparecer en Google Maps / búsquedas locales y en el
// panel lateral de resultados.
//
// AJUSTA lo que corresponda (horario, email, redes sociales) y luego
// no necesitas tocar este archivo de nuevo salvo que cambien esos datos.

export const negocioSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Anidar Centro Terapéutico",
  alternateName: "Crece TO",
  description:
    "Centro terapéutico especializado en terapia ocupacional infantil y para adultos en Talca.",
  url: "https://centroanidar.cl",
  logo: "https://centroanidar.cl/logo-icon.png",
  image: "https://centroanidar.cl/logo-icon.png",
  telephone: "+56934873036",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Calle 1 Sur con 1 Poniente N° 690, Edificio Plaza Talca, Piso 12, Oficina 1210",
    addressLocality: "Talca",
    addressRegion: "Región del Maule",
    addressCountry: "CL",
  },
  // TODO (opcional): agrega horario real, ej:
  // openingHoursSpecification: [
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  //     opens: "09:00",
  //     closes: "18:00",
  //   },
  // ],
  medicalSpecialty: "Occupational Therapy",
  areaServed: {
    "@type": "City",
    name: "Talca",
  },
  sameAs: ["https://www.instagram.com/centro.anidar"],
};
