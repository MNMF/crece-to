import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export type DetalleCita = {
  nombrePaciente: string;
  edad?: number | null;
  areaNombre: string;
  profesionalNombre: string;
  fecha: string; // "yyyy-MM-dd"
  hora: string; // "HH:mm" o "HH:mm:ss"
  telefono: string;
  email?: string | null;
  rut: string;
  notas?: string | null;
};

const DIRECCION =
  "Calle 1 Sur con 1 Poniente N° 690, Edificio Plaza Talca, Piso 12, Oficina 1210, Talca";
const WHATSAPP_URL = "https://wa.me/56934873036";

function fechaLegible(fecha: string) {
  try {
    return format(parseISO(fecha), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  } catch {
    return fecha;
  }
}

function layout(cuerpoHtml: string) {
  return `
  <div style="background:#FAF5EF; padding:32px 16px; font-family:Arial, Helvetica, sans-serif;">
    <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #F2EBE0;">
      <div style="background:#FAF5EF; padding:24px; text-align:center;">
        <img src="https://centroanidar.cl/logo-header.png" alt="Anidar Centro Terapéutico" style="height:56px;" />
      </div>
      <div style="padding:24px 28px; color:#6B3A1F; font-size:15px; line-height:1.6;">
        ${cuerpoHtml}
      </div>
      <div style="background:#6B3A1F; color:#FAF5EF; text-align:center; padding:16px; font-size:12px;">
        Anidar Centro Terapéutico · Talca, Chile
      </div>
    </div>
  </div>`;
}

function filaResumen(d: DetalleCita) {
  return `
    <div style="background:#F2EBE0; border-radius:12px; padding:16px 18px; margin:16px 0;">
      <p style="margin:0 0 4px 0;"><strong>${d.areaNombre}</strong></p>
      <p style="margin:0 0 4px 0;">Con ${d.profesionalNombre}</p>
      <p style="margin:0; text-transform:capitalize;">${fechaLegible(d.fecha)} a las ${d.hora.slice(0, 5)}</p>
    </div>`;
}

export function emailConfirmacionReserva(d: DetalleCita) {
  const subject = "Recibimos tu solicitud de hora – Anidar Centro Terapéutico";
  const html = layout(`
    <p>Hola ${d.nombrePaciente},</p>
    <p>Recibimos tu solicitud de hora. Nuestro equipo va a confirmarla a la brevedad — te avisaremos por este mismo correo apenas quede lista.</p>
    ${filaResumen(d)}
    <p style="font-size:13px; color:#6B3A1F99;">Si necesitas hacer un cambio o tienes alguna duda mientras tanto, puedes escribirnos directo por <a href="${WHATSAPP_URL}" style="color:#B87820;">WhatsApp</a>.</p>
  `);
  return { subject, html };
}

export function emailAvisoNuevaCita(d: DetalleCita) {
  const subject = `Nueva solicitud de cita — ${d.nombrePaciente}`;
  const html = layout(`
    <p>Llegó una nueva solicitud de hora desde el sitio web.</p>
    ${filaResumen(d)}
    <div style="margin-top:16px;">
      <p style="margin:0 0 4px 0;"><strong>Paciente:</strong> ${d.nombrePaciente}${d.edad ? ` (${d.edad} años)` : ""}</p>
      <p style="margin:0 0 4px 0;"><strong>RUT:</strong> ${d.rut}</p>
      <p style="margin:0 0 4px 0;"><strong>Teléfono:</strong> ${d.telefono}</p>
      ${d.email ? `<p style="margin:0 0 4px 0;"><strong>Email:</strong> ${d.email}</p>` : ""}
      ${d.notas ? `<p style="margin:0;"><strong>Notas:</strong> ${d.notas}</p>` : ""}
    </div>
    <p style="font-size:13px; color:#6B3A1F99; margin-top:16px;">Entra al panel de administración para confirmarla o rechazarla.</p>
  `);
  return { subject, html };
}

export function emailConfirmacionCita(d: DetalleCita) {
  const subject = "Tu hora fue confirmada – Anidar Centro Terapéutico";
  const html = layout(`
    <p>Hola ${d.nombrePaciente},</p>
    <p>¡Buenas noticias! Confirmamos tu hora:</p>
    ${filaResumen(d)}
    <p style="margin:0 0 4px 0;"><strong>Dirección:</strong> ${DIRECCION}</p>
    <p style="font-size:13px; color:#6B3A1F99; margin-top:16px;">Si necesitas reagendar o cancelar, escríbenos por <a href="${WHATSAPP_URL}" style="color:#B87820;">WhatsApp</a> con la mayor anticipación posible.</p>
  `);
  return { subject, html };
}
