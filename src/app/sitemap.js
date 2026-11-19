const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maisondelatransformation.com';
const ROUTES = ['', '/about', '/ql', '/campuses', '/cell-church', '/map', '/give', '/building-project', '/celebrations', '/ministries', '/membership-class', '/membership', '/prayer-request', '/first-timers', '/online-community', '/counselling', '/pre-marital-counselling', '/post-marital-counselling', '/welfare', '/volunteers', '/testimony', '/sermons', '/events', '/contact'];
export default function sitemap() {
  return ROUTES.map((r) => ({ url: `${SITE_URL}${r}`, changeFrequency: 'weekly', priority: r === '' ? 1 : 0.7 }));
}
