import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import { CAMPUSES, CAMPUS_LIST, isCampus } from '@/lib/campuses';
import { MINISTRIES, SITE } from '@/lib/site';

export function generateStaticParams() { return CAMPUS_LIST.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return isCampus(slug) ? { title: CAMPUSES[slug].name, description: `${SITE.name} : ${CAMPUSES[slug].city}, ${CAMPUSES[slug].country}.` } : {};
}

const CONNECT = [['Devenir membre', '/membership'], ['Requête de prière', '/prayer-request'], ['Première visite', '/first-timers'], ['Communauté en ligne', '/online-community']];
const RESOURCES = [['Classes de membres', '/membership-class'], ['Célébrations', '/celebrations'], ['Accompagnement', '/counselling'], ['Pré-mariage', '/pre-marital-counselling'], ['Post-mariage', '/post-marital-counselling'], ['Bénévoles', '/volunteers'], ['Aide sociale', '/welfare']];
const MEDIA = [['Regarder en ligne', SITE.youtube], ['Sermons', '/sermons'], ['Événements', '/events']];

export default async function CampusPage({ params }) {
  const { slug } = await params;
  if (!isCampus(slug)) notFound();
  const c = CAMPUSES[slug];
  return (
    <>
      <Hero eyebrow={`${c.city}, ${c.country}`} title={c.name} accent="" text={SITE.vision} image="/img/fond1.jpg" />
      <section className="section">
        <div className="container split">
          <div className="stack">
            <span className="pill" style={{ color: 'var(--navy)' }}>Nous trouver</span>
            <h2 className="h2">{c.city}, <span className="accent">{c.country}</span></h2>
            <p className="lead">{c.address || 'Adresse bientôt disponible. Contactez-nous pour être guidé.'}</p>
            {c.services.length > 0
              ? c.services.map((s) => <div className="card" key={s.day}><h3>{s.day}</h3><p>{s.label}</p><p><strong>{s.times.join('  ·  ')}</strong></p></div>)
              : <div className="card"><h3>Horaires des cultes</h3><p>Bientôt disponibles. Rejoignez la communauté en ligne pour être informé.</p></div>}
            <div className="btn-row">
              <a className="btn btn-navy" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address || c.mapQuery)}`} target="_blank" rel="noopener noreferrer">Ouvrir dans Maps</a>
              <a className="btn btn-outline" style={{ color: 'var(--navy)' }} href={c.phoneHref || SITE.phoneHref}>Appeler</a>
            </div>
          </div>
          <iframe title={`Carte ${c.name}`} loading="lazy" style={{ border: 0, width: '100%', aspectRatio: '4 / 5', borderRadius: 14 }} src={`https://www.google.com/maps?q=${encodeURIComponent(c.address || c.mapQuery)}&output=embed`} />
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container">
          <div className="center stack" style={{ marginBottom: '2.5rem' }}><h2 className="h2">Une famille à <span className="accent">{c.city}</span></h2><p className="lead">Plus qu’une église, un lieu pour grandir.</p></div>
          <div className="grid g3">
            {[['Se connecter', CONNECT], ['Ressources', RESOURCES], ['Médias', MEDIA]].map(([t, links]) => (
              <div className="card" key={t}>
                <h3>{t}</h3>
                <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                  {links.map(([l, h]) => <li key={l}>{h.startsWith('http') ? <a href={h} target="_blank" rel="noopener noreferrer">{l}</a> : <Link href={h}>{l}</Link>}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="center stack" style={{ marginBottom: '2rem' }}><h2 className="h2">Nos <span className="accent">ministères</span></h2></div>
          <div className="grid g3">
            {MINISTRIES.map((m) => <div className="card" key={m.id}><h3>{m.title}</h3><p>{m.text}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
