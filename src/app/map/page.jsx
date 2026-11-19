import Hero from '@/components/Hero';
import RequestForm from '@/components/RequestForm';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'MAP – Rencontre et Prière' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Bienvenue au" title="MAP" accent="Meet & Pray" text="Plus qu’un rassemblement : une famille à laquelle on appartient vraiment." image="/img/discover1.jpg"><a href="#rejoindre" className="btn btn-gold">Rejoindre un MAP</a></Hero>
      <section className="section">
        <div className="container head-split">
          <h2 className="h2">À propos de <span className="accent">Meet &amp; Pray</span></h2>
          <p className="lead">MAP est une initiative qui rassemble les membres en petits groupes pour la prière, la communion et des liens vrais. Que vous soyez nouveau ou membre de longue date, vous y avez votre place.</p>
        </div>
        <div className="container grid g3 mt">
          {[['Prier', 'Vivre des temps de prière de qualité avec votre communauté.'], ['Étudier et grandir', 'Approfondir la Parole par l’étude, les échanges et les résumés de sermons.'], ['Se connecter', 'Tisser des relations, trouver des mentors et partager vos expériences.']].map(([t, p]) => (
            <div key={t}><div className="mark" /><h3 style={{ color: 'var(--navy)' }}>{t}</h3><p className="lead" style={{ fontSize: '.95em', marginTop: '.5rem' }}>{p}</p></div>))}
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container head-split">
          <h2 className="h2">Pourquoi participer <span className="accent">au MAP ?</span></h2>
          <div className="grid">
            {[['Communion plus forte', 'L’église est plus qu’un lieu de culte, c’est une famille. MAP offre un espace chaleureux pour bâtir des liens.'], ['Croissance spirituelle', 'Une foi qui grandit demande du lien avec Dieu et avec les autres : prière, adoration et discussions bibliques.'], ['Soutien et réseau', 'La vie est meilleure partagée : trouvez encouragement, mentorat et un partenaire de prière.']].map(([t, p]) => (
              <div className="card" key={t}><h3>{t}</h3><p>{p}</p></div>))}
          </div>
        </div>
      </section>
      <section className="section bg-dark" id="rejoindre">
        <div className="container head-split">
          <div className="stack"><h2 className="h2">Trouver un groupe <span className="accent">MAP</span></h2><p className="lead">Retrouvez des membres proches de vous pour prier et vivre la communion.</p></div>
          <RequestForm type="map_join" submitLabel="Rejoindre un MAP" fields={[...IDENT, { name: 'zone', label: 'Votre quartier', required: true }, CONSENT]} />
        </div>
      </section>
    </>
  );
}
