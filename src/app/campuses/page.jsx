import Hero from '@/components/Hero';
import { SITE, SERVICES } from '@/lib/site';
import { CAMPUS_LIST, subdomainUrl } from '@/lib/campuses';

export const metadata = { title: 'Lieux' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Nous trouver" title="Nous enrôlons, formons" accent="et envoyons" text="Rejoignez-nous à la Maison de la Transformation." image="/img/fond1.jpg" />
      <section className="section bg-cream">
        <div className="container">
          <div className="center stack" style={{ marginBottom: '2rem' }}><h2 className="h2">Nos <span className="accent">lieux</span></h2><p className="lead">Une même famille, trois villes, deux pays.</p></div>
          <div className="grid g3">
            {CAMPUS_LIST.map((c) => (
              <div className="card" key={c.slug}>
                <h3>{c.name}</h3>
                <p>{c.city}, {c.country}</p>
                <div className="btn-row"><a className="btn btn-navy" href={subdomainUrl(c.slug)}>Visiter le site</a></div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
      <section className="section bg-cream">
        <div className="container">
          <div className="center stack" style={{ marginBottom: '2.5rem' }}><h2 className="h2">À quoi vous <span className="accent">attendre</span></h2><p className="lead">Votre première visite en trois étapes. [Texte à valider par l’église.]</p></div>
          <div className="grid g3">
            {[['Un accueil chaleureux', 'Notre équipe d’accueil vous reçoit et vous oriente à votre arrivée.'], ['Un culte vivant', 'Louange, prière et enseignement de la Parole dans une atmosphère d’adoration.'], ['Une famille', 'Après le culte, faites connaissance et rejoignez un groupe ou une cellule.']].map(([t, p], i) => (
              <div className="card" key={t}><span className="num">{i + 1}</span><h3>{t}</h3><p>{p}</p></div>))}
          </div>
          <div className="btn-row center mt"><a className="btn btn-navy" href="/first-timers">Annoncer ma visite</a></div>
        </div>
      </section>
    </>
  );
}
