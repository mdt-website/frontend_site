import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const TYPES = new Set(['newsletter', 'membership', 'class_enrol', 'class_makeup', 'class_certificate', 'prayer', 'first_timer', 'online_community', 'counselling', 'pre_marital', 'post_marital', 'welfare', 'celebration', 'cell_join', 'cell_register', 'map_join', 'volunteer', 'testimony', 'contact', 'donation']);

// Phase 1 : journal local (.data/requests.jsonl). Phase 2 : remplacé par la base de données du CRM.
export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: 'Requête invalide' }, { status: 400 }); }
  if (!body || !TYPES.has(body.type)) return Response.json({ error: 'Type inconnu' }, { status: 400 });
  const clean = {};
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === 'string' || typeof v === 'boolean') clean[k] = typeof v === 'string' ? v.slice(0, 4000) : v;
  }
  const dir = path.join(process.cwd(), '.data');
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, 'requests.jsonl'), JSON.stringify({ ...clean, createdAt: new Date().toISOString() }) + '\n');
  return Response.json({ ok: true });
}
