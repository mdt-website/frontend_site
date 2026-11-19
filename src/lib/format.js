const tz = 'Africa/Porto-Novo';

export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: tz }) : '');
export const fmtDateTime = (d) => (d ? new Date(d).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: tz }) : '');
// Valeur pour <input type="datetime-local"> (heure du Bénin, UTC+1)
export const toInputDateTime = (d) => (d ? new Date(new Date(d).getTime() + 3600_000).toISOString().slice(0, 16) : '');
// Lecture d'un <input datetime-local> saisi en heure du Bénin ; renvoie une Date (invalide si vide)
export const fromInputDateTime = (s) => new Date(`${String(s).slice(0, 16)}:00+01:00`);

// Cellule CSV : neutralise l'injection de formules Excel (=, +, -, @) et échappe les guillemets
export const csvCell = (v) => {
  let s = String(v ?? '');
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};
