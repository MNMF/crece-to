export type Area = {
  slug: string;
  nombre: string;
  descripcion: string;
};

export const areas: Area[] = [
  {
    slug: "fonoaudiologia",
    nombre: "Atención Fonoaudiológica",
    descripcion: "Evaluación y tratamiento del lenguaje, el habla y la comunicación en niños y adultos.",
  },
  {
    slug: "terapia-ocupacional",
    nombre: "Atención Terapia Ocupacional",
    descripcion: "Desarrollo de habilidades para la autonomía, el juego y las actividades de la vida diaria.",
  },
  {
    slug: "psicologia",
    nombre: "Atención Psicológica",
    descripcion: "Acompañamiento emocional y conductual para niños, adolescentes y adultos.",
  },
  {
    slug: "psicopedagogia",
    nombre: "Atención Psicopedagógica",
    descripcion: "Apoyo en el aprendizaje escolar y estrategias para superar dificultades académicas.",
  },
];
