const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maisondelatransformation.com';
export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/checkin'] }], sitemap: `${SITE_URL}/sitemap.xml` };
}
