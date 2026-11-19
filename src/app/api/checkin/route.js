import { db } from '@/lib/db';
import { clientIp, normalizePhone, rateLimit } from '@/lib/security';

const json = (body, status = 200) => Response.json(body, { status });

// Présence au culte : le fidèle saisit le code à 4 chiffres affiché à l'écran.
export async function POST(req) {
  const ip = clientIp(req.headers);
  // Limite stricte : empêche de deviner les codes à 4 chiffres par force brute
  if (!rateLimit(`checkin:${ip}`, 6, 5 * 60_000)) return json({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' }, 429);

  let body;
  try { body = await req.json(); } catch { return json({ error: 'Requête invalide' }, 400); }
  const code = String(body?.code || '').trim();
  const name = String(body?.nom || '').trim().slice(0, 120);
  const phone = normalizePhone(body?.telephone);
  if (!/^\d{4}$/.test(code)) return json({ error: 'Le code doit contenir 4 chiffres.' }, 400);
  if (!name) return json({ error: 'Votre nom est requis.' }, 400);
  if (!phone) return json({ error: 'Numéro de téléphone invalide.' }, 400);

  const service = await db.service.findFirst({ where: { code, open: true }, orderBy: { date: 'desc' } });
  if (!service) return json({ error: 'Code incorrect ou culte fermé.' }, 404);

  const person = (await db.person.findFirst({ where: { phone } })) || (await db.person.create({ data: { name, phone, source: 'checkin' } }));
  try {
    await db.attendance.create({ data: { serviceId: service.id, personId: person.id, name, phone } });
  } catch {
    return json({ ok: true, already: true, title: service.title }); // déjà enregistré (contrainte d'unicité)
  }
  return json({ ok: true, title: service.title });
}
