import Hero from '@/components/Hero';
import { SITE, SERVICES } from '@/lib/site';

export const metadata = { title: 'Lieux' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Nous trouver" title="Nous enrôlons, formons" accent="et envoyons" text="Rejoignez-nous à la Maison de la Transformation." image="/img/fond1.jpg" />
      <section className="section">
        <div className="container split">
          <div className="stack">
            <span className="pill" style={{ color: 'var(--navy)' }}>MDT Calavi</span>
            <h2 className="h2">Abomey-Calavi, <span className="accent">Bénin</span></h2>
            <p className="lead">{SITE.address}</p>
            {SERVICES.map((s) => <div className="card" key={s.day}><h3>{s.day}</h3><p>{s.label}</p><p><strong>{s.times.join('  ·  ')}</strong></p></div>)}
            <div className="btn-row">
              <a className="btn btn-navy" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Zogbadjè Abomey-Calavi Bénin')}`} target="_blank" rel="noopener noreferrer">Ouvrir dans Maps</a>
              <a className="btn btn-outline" style={{ color: 'var(--navy)' }} href={SITE.phoneHref}>Appeler</a>
            </div>
          </div>
          <iframe title="Carte MDT" loading="lazy" style={{ border: 0, width: '100%', aspectRatio: '4 / 5', borderRadius: 14 }} src="https://www.google.com/maps?q=Zogbadj%C3%A8%20Abomey-Calavi%20B%C3%A9nin&output=embed" />
        </div>
      </section>
    </>
  );
}
