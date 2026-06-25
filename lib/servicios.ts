export type Servicio = {
  slug: string;
  titulo: string;
  poblacion: "Infantil" | "Adultos";
  resumen: string;
  detalle: string;
  duracionMin: number;
};

export const servicios: Servicio[] = [
  {
    slug: "estimulacion-temprana",
    titulo: "Estimulación temprana",
    poblacion: "Infantil",
    resumen: "Apoyo en hitos del desarrollo desde los primeros meses de vida.",
    detalle:
      "Sesiones de juego dirigido para favorecer el desarrollo motor, sensorial y cognitivo en la primera infancia, con orientación a la familia para continuar el trabajo en casa.",
    duracionMin: 45,
  },
  {
    slug: "integracion-sensorial",
    titulo: "Integración sensorial",
    poblacion: "Infantil",
    resumen: "Para niños y niñas con dificultades para procesar estímulos del entorno.",
    detalle:
      "Trabajo especializado en procesamiento sensorial: regulación, atención y participación en actividades cotidianas y escolares.",
    duracionMin: 45,
  },
  {
    slug: "to-infantil",
    titulo: "Terapia ocupacional infantil",
    poblacion: "Infantil",
    resumen: "Desarrollo de habilidades para la autonomía en casa y el colegio.",
    detalle:
      "Intervención en motricidad fina, coordinación, autonomía en actividades de la vida diaria y habilidades pre-escolares y escolares.",
    duracionMin: 45,
  },
  {
    slug: "rehabilitacion-neurologica",
    titulo: "Rehabilitación neurológica",
    poblacion: "Adultos",
    resumen: "Recuperación funcional tras ACV, TEC u otras condiciones neurológicas.",
    detalle:
      "Reentrenamiento de actividades de la vida diaria, fuerza funcional y autonomía para personas adultas tras un evento neurológico.",
    duracionMin: 50,
  },
  {
    slug: "to-adulto-mayor",
    titulo: "Terapia ocupacional en adulto mayor",
    poblacion: "Adultos",
    resumen: "Mantención de la autonomía e independencia en el día a día.",
    detalle:
      "Trabajo en prevención de caídas, mantención funcional y adaptación del entorno para favorecer la independencia en personas mayores.",
    duracionMin: 50,
  },
  {
    slug: "visita-domiciliaria",
    titulo: "Evaluación y adaptación del entorno",
    poblacion: "Adultos",
    resumen: "Visita a domicilio para evaluar y adaptar espacios según necesidad.",
    detalle:
      "Evaluación in situ del hogar y recomendaciones concretas de adaptación para mayor seguridad y autonomía de la persona.",
    duracionMin: 60,
  },
];
