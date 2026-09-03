import { Resend } from "resend";

// Si RESEND_API_KEY no está configurada (o no se ha desplegado aún), usamos un
// valor de relleno para que el build de Next.js nunca falle por esto. Los envíos
// simplemente fallarán en tiempo de ejecución (capturado por el try/catch en
// cada lugar donde se llama a resend.emails.send) hasta que la key real esté puesta.
export const resend = new Resend(process.env.RESEND_API_KEY || "re_missing_key");

// Remitente: requiere que centroanidar.cl esté verificado en Resend.
// Mientras no lo esté, los envíos a direcciones reales fallarán en silencio
// (quedan registrados en los logs de Vercel, pero no rompen el flujo de la app).
export const REMITENTE = "Anidar Centro Terapéutico <hola@centroanidar.cl>";

// Correo interno donde llegan los avisos de "cita nueva".
export const EMAIL_NOTIFICACIONES_CENTRO = "centroterapeuticoanidar@gmail.com";
