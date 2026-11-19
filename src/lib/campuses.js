import { SITE, SERVICES } from './site';

// Les trois lieux MDT. Les champs marqués `null` sont à fournir par l'église (rien n'est inventé).
export const CAMPUSES = {
  calavi: {
    slug: 'calavi', name: 'MDT Calavi', city: 'Abomey-Calavi', country: 'Bénin',
    address: SITE.address, phone: SITE.phone, phoneHref: SITE.phoneHref,
    services: SERVICES, mapQuery: 'Zogbadjè Abomey-Calavi Bénin', pastor: null,
  },
  cotonou: {
    slug: 'cotonou', name: 'MDT Cotonou', city: 'Cotonou', country: 'Bénin',
    address: null, phone: null, phoneHref: null, services: [], mapQuery: 'Cotonou Bénin', pastor: null,
  },
  lome: {
    slug: 'lome', name: 'MDT Lomé', city: 'Lomé', country: 'Togo',
    address: null, phone: null, phoneHref: null, services: [], mapQuery: 'Lomé Togo', pastor: null,
  },
};

export const CAMPUS_LIST = Object.values(CAMPUSES);
export const isCampus = (s) => typeof s === 'string' && Object.hasOwn(CAMPUSES, s);

// Domaine racine, ex. maisondelatransformation.com (en local : localhost)
export function rootDomain() {
  if (process.env.ROOT_DOMAIN) return process.env.ROOT_DOMAIN.toLowerCase();
  try { return new URL(process.env.NEXT_PUBLIC_SITE_URL || '').hostname.replace(/^www\./, ''); } catch { return 'localhost'; }
}

// Adresse publique d'un sous-domaine (utilisée dans les liens)
export function subdomainUrl(sub) {
  const root = rootDomain();
  return root === 'localhost' ? `http://${sub}.localhost:3100` : `https://${sub}.${root}`;
}
