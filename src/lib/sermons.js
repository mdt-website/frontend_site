import { db } from './db';
import { fmtDate } from './format';

export const SERMON_THEMES = ['Bonne nouvelle', 'Salut', 'L’amour de Jésus', 'Pardon', 'Vie nouvelle', 'Espérance', 'Grâce', 'La croix', 'Guérison', 'Foi', 'Rédemption', 'Miséricorde', 'Vie éternelle', 'Paix', 'Croyance', 'Vérité', 'Prière', 'Joie'];

// Identifiant YouTube d'un lien (watch, youtu.be, embed) ; null pour tout autre lien.
export function youtubeId(url) {
  try {
    const u = new URL(url);
    let id = null;
    if (u.hostname === 'youtu.be') id = u.pathname.slice(1);
    else if (/(^|\.)youtube\.com$/.test(u.hostname)) id = u.searchParams.get('v') || (/^\/(embed|live|shorts)\//.test(u.pathname) ? u.pathname.split('/')[2] : null);
    return id && /^[\w-]{6,20}$/.test(id) ? id : null;
  } catch { return null; }
}

export const thumb = (url) => { const id = youtubeId(url); return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null; };

export function shape(s) {
  return { id: s.id, slug: s.slug || s.id, title: s.title, speaker: s.speaker, series: s.series, description: s.description, date: fmtDate(s.date), url: s.url, audioUrl: s.audioUrl, thumb: thumb(s.url), tags: s.tags.split(',').map((t) => t.trim()).filter(Boolean) };
}

// La base peut être indisponible : les pages restent utilisables (lien YouTube)
export async function listSermons(where = {}, take = 200) {
  try {
    const rows = await db.sermon.findMany({ where: { published: true, ...where }, orderBy: { date: 'desc' }, take });
    return rows.map(shape);
  } catch { return []; }
}
