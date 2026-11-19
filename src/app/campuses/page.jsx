import Hero from '@/components/Hero';
import { CAMPUS_LIST, subdomainUrl } from '@/lib/campuses';
import CampusExplorer from './CampusExplorer';

export const metadata = { title: 'Lieux' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Nous trouver" title="Nous enrôlons, formons" accent="et envoyons" text="Rejoignez-nous à la Maison de la Transformation." image="/img/fond1.jpg" />
      <section className="section">
        <CampusExplorer campuses={CAMPUS_LIST.map((c) => ({ slug: c.slug, name: c.name, city: c.city, country: c.country, address: c.address, mapQuery: c.mapQuery, services: c.services, site: subdomainUrl(c.slug) }))} />
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
