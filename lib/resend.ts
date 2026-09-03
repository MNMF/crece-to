import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Remitente: requiere que centroanidar.cl esté verificado en Resend.
// Mientras no lo esté, los envíos a direcciones reales fallarán en silencio
// (quedan registrados en los logs de Vercel, pero no rompen el flujo de la app).
export const REMITENTE = "Anidar Centro Terapéutico <hola@centroanidar.cl>";

// Correo interno donde llegan los avisos de "cita nueva".
export const EMAIL_NOTIFICACIONES_CENTRO = "centroterapeuticoanidar@gmail.com";
