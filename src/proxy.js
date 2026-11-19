import { NextResponse } from 'next/server';

// Une seule application, plusieurs sous-domaines :
//  - calavi / cotonou / lome  -> mini-site du lieu (/c/<lieu>), et le lieu est transmis aux formulaires
//  - sermons, app, lms, dp, evenements -> pages d'accueil dédiées
const CAMPUS = new Set(['calavi', 'cotonou', 'lome']);
const HOME_OF = { sermons: '/sermons', app: '/checkin', lms: '/lms', dp: '/dp', evenements: '/events' };

function rootOf(host) {
  const env = (process.env.ROOT_DOMAIN || '').toLowerCase();
  if (env) return env;
  try { return new URL(process.env.NEXT_PUBLIC_SITE_URL || '').hostname.replace(/^www\./, ''); } catch { return 'localhost'; }
}

export function proxy(req) {
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0];
  const roots = [rootOf(host), 'localhost'];
  let sub = null;
  for (const r of roots) {
    if (host.endsWith(`.${r}`)) { sub = host.slice(0, -(r.length + 1)); break; }
  }

  // On ne fait jamais confiance à un en-tête envoyé par le client
  const headers = new Headers(req.headers);
  headers.delete('x-campus');
  const { pathname } = req.nextUrl;

  if (sub && CAMPUS.has(sub)) {
    headers.set('x-campus', sub);
    if (pathname === '/') {
      const url = req.nextUrl.clone();
      url.pathname = `/c/${sub}`;
      return NextResponse.rewrite(url, { request: { headers } });
    }
  } else if (sub && HOME_OF[sub] && pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = HOME_OF[sub];
    return NextResponse.rewrite(url, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!_next/|img/|favicon|.*\\.(?:png|jpg|jpeg|svg|webp|ico|mp4|txt|xml|webmanifest)$).*)'],
};
