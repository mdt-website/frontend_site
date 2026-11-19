import { db } from '@/lib/db';
import { REQUEST_TYPES } from '@/lib/crm';
import { CAMPUS_LIST, isCampus } from '@/lib/campuses';
import { FORMS, NO_PERSON, isShown } from '@/lib/forms';
import { clientIp, isEmail, normalizePhone, rateLimit } from '@/lib/security';

const MAX_FIELD = 4000;
// Champs acceptés par formulaire (tout le reste est ignoré)
const COMMON = ['nom', 'telephone', 'email', 'accord'];
const FIELDS = {
  membership: [...COMMON, 'quartier', 'bapteme'],
  class_enrol: [...COMMON, 'classe'],
  class_makeup: [...COMMON, 'classe'],
  class_certificate: [...COMMON, 'classe'],
  prayer: [...COMMON, 'sujet', 'confidentiel'],
  first_timer: [...COMMON, 'connu', 'message'],
  online_community: [...COMMON, 'ville'],
  counselling: [...COMMON, 'categorie', 'message'],
  pre_marital: [...COMMON, 'partenaire', 'date', 'message'],
  post_marital: [...COMMON, 'conjoint', 'message'],
  welfare: [...COMMON, 'besoin', 'message'],
  celebration: [...COMMON, 'evenement', 'date', 'message'],
  cell_join: [...COMMON, 'zone'],
  cell_register: [...COMMON, 'zone', 'jour'],
  map_join: [...COMMON, 'zone'],
  volunteer: [...COMMON, 'ministere'],
  testimony: [...COMMON, 'message', 'publier'],
  contact: [...COMMON, 'message'],
  donation: [...COMMON, 'nature', 'montant', 'moyen'],
  event_register: [...COMMON, 'evenement', 'personnes'],
};
const REQUIRED = {
  default: ['nom', 'telephone'],
  prayer: ['nom', 'telephone', 'sujet'],
  contact: ['nom', 'telephone', 'message'],
  testimony: ['nom', 'telephone', 'message'],
  welfare: ['nom', 'telephone', 'besoin', 'message'],
  donation: ['nom', 'telephone', 'nature'],
  pre_marital: ['nom', 'telephone', 'partenaire'],
  post_marital: ['nom', 'telephone', 'conjoint'],
};

const json = (body, status = 200) => Response.json(body, { status });

async function notify(type, name) {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `Nouvelle demande MDT : ${REQUEST_TYPES[type] || type} (${name})` }),
      signal: AbortSignal.timeout(4000),
    });
  } catch { /* la notification ne doit jamais bloquer la réponse */ }
}

export async function POST(req) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`req:${ip}`, 8, 60_000)) return json({ error: 'Trop de demandes, réessayez dans une minute.' }, 429);

  let body;
  try { body = await req.json(); } catch { return json({ error: 'Requête invalide' }, 400); }
  if (!body || typeof body !== 'object') return json({ error: 'Requête invalide' }, 400);

  // Champ piège : un humain ne le remplit jamais
  if (body.website) return json({ ok: true });

  const { type } = body;
  // Le lieu vient du sous-domaine (en-tête posé par le proxy, jamais par le client)
  const hc = req.headers.get('x-campus');
  let campus = isCampus(hc) ? hc : null;

  // Newsletter : table dédiée
  if (type === 'newsletter') {
    const email = String(body.email || '').trim().toLowerCase();
    if (!isEmail(email) || email.length > 200) return json({ error: 'Email invalide' }, 400);
    await db.subscriber.upsert({ where: { email }, update: {}, create: { email } });
    return json({ ok: true });
  }

  if (!REQUEST_TYPES[type]) return json({ error: 'Type de demande inconnu' }, 400);

  const data = {};
  const spec = FORMS[type];
  if (spec) {
    // Formulaire calqué sur CCI : on valide chaque champ selon sa définition (type, options, obligatoire, affichage conditionnel)
    const raw = {};
    for (const f of spec.fields) raw[f.name] = body[f.name];
    for (const f of spec.fields) {
      if (f.type === 'section' || !isShown(f, raw)) continue;
      let v = raw[f.name];
      if (f.type === 'multi') {
        v = Array.isArray(v) ? v.filter((x) => typeof x === 'string' && f.options.includes(x)) : [];
        if (v.length) data[f.name] = v.join(', ');
      } else if (f.type === 'consent' || f.type === 'checkbox') {
        if (v === true) data[f.name] = true;
      } else if (typeof v === 'string' && v.trim()) {
        v = v.trim().slice(0, MAX_FIELD);
        if ((f.type === 'select' || f.type === 'radio') && !f.options.includes(v)) return json({ error: `Valeur invalide : ${f.label}` }, 400);
        if (f.type === 'rating' && !/^[1-5]$/.test(v)) return json({ error: `Note invalide : ${f.label}` }, 400);
        if (f.type === 'number' && !/^\d{1,6}$/.test(v)) return json({ error: `Nombre invalide : ${f.label}` }, 400);
        if (f.type === 'url' && !/^https?:\/\/\S+$/i.test(v)) return json({ error: `Lien invalide : ${f.label}` }, 400);
        if (f.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return json({ error: `Date invalide : ${f.label}` }, 400);
        if (f.type === 'time' && !/^\d{2}:\d{2}$/.test(v)) return json({ error: `Heure invalide : ${f.label}` }, 400);
        if (f.type === 'email' && !isEmail(v)) return json({ error: `Email invalide : ${f.label}` }, 400);
        if (f.type === 'tel' && !normalizePhone(v)) return json({ error: `Numéro invalide : ${f.label}` }, 400);
        data[f.name] = f.type === 'email' ? v.toLowerCase() : v;
      }
      if (f.required && data[f.name] == null) return json({ error: 'Veuillez remplir tous les champs obligatoires.' }, 400);
    }
  } else {
    for (const k of FIELDS[type]) {
      const v = body[k];
      if (typeof v === 'string') { const t = v.trim().slice(0, MAX_FIELD); if (t) data[k] = t; }
      else if (typeof v === 'boolean') data[k] = v;
    }
    for (const k of REQUIRED[type] || REQUIRED.default) {
      if (!data[k]) return json({ error: 'Veuillez remplir tous les champs obligatoires.' }, 400);
    }
  }
  const phone = normalizePhone(data.telephone);
  if (data.telephone && !phone) return json({ error: 'Numéro de téléphone invalide' }, 400);
  if (data.email && !isEmail(data.email)) return json({ error: 'Email invalide' }, 400);
  if (data.email) data.email = data.email.toLowerCase();
  if (!data.nom && !NO_PERSON.has(type)) return json({ error: 'Veuillez remplir tous les champs obligatoires.' }, 400);

  if (!campus) campus = CAMPUS_LIST.find((c) => c.name === (data.lieu || data.partenaire_lieu))?.slug || 'calavi';

  // Enquêtes anonymes : pas de fiche personne
  if (NO_PERSON.has(type)) {
    const r = await db.request.create({ data: { type, campus, data: JSON.stringify(data) } });
    await notify(type, 'anonyme');
    return json({ ok: true, id: r.id });
  }

  // CRM : retrouver ou créer la personne (téléphone, sinon email)
  const email = data.email || null;
  let person = (phone && (await db.person.findFirst({ where: { phone } }))) || (email && (await db.person.findFirst({ where: { email } }))) || null;
  if (person) {
    person = await db.person.update({ where: { id: person.id }, data: { name: data.nom, phone: phone || person.phone, email: email || person.email, quarter: data.localisation || data.quartier || data.zone || person.quarter } });
  } else {
    person = await db.person.create({ data: { name: data.nom, phone, email, quarter: data.localisation || data.quartier || data.zone || null, source: type, campus } });
  }

  const request = await db.request.create({ data: { type, campus, data: JSON.stringify(data), personId: person.id } });

  if (type === 'donation') {
    const amount = parseInt(String(data.montant || '').replace(/\D/g, ''), 10);
    await db.donation.create({ data: { nature: data.nature, amount: Number.isFinite(amount) ? amount : null, method: data.moyen || null, personId: person.id } });
  }

  await notify(type, data.nom);
  return json({ ok: true, id: request.id });
}
