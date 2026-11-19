import 'server-only';
import nodemailer from 'nodemailer';

// Envoi d'emails par SMTP (ex. Brevo, gratuit jusqu'à 300 par jour). Sans SMTP_URL, rien n'est envoyé.
export const mailEnabled = () => !!process.env.SMTP_URL;

let transport;
export async function sendMail({ to, subject, text, html }) {
  if (!mailEnabled()) return { sent: false, reason: 'SMTP non configuré' };
  transport ||= nodemailer.createTransport(process.env.SMTP_URL);
  try {
    await transport.sendMail({ from: process.env.MAIL_FROM || 'La Maison de la Transformation <no-reply@maisondelatransformation.com>', to, subject, text, html });
    return { sent: true };
  } catch (e) {
    return { sent: false, reason: String(e.message || e).slice(0, 200) };
  }
}
