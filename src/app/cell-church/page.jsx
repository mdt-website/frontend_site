import Hero from '@/components/Hero';
import RequestForm from '@/components/RequestForm';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Cellules de maison' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="L’expérience des cellules" title="Notre" accent="église de cellules" text="Plus qu’un rassemblement : une famille à laquelle on appartient vraiment." image="/img/discover2.jpg">
        <div className="btn-row center"><a className="btn btn-gold" href="#inscrire">Enregistrer une cellule</a><a className="btn btn-outline" href="#rejoindre">Rejoindre une cellule</a></div>
      </Hero>

      <section className="section">
        <div className="container head-split">
          <h2 className="h2">Près de chez vous, <span className="accent">comme à la maison</span></h2>
          <p className="lead">Une cellule est un petit groupe de 7 à 10 disciples ou frères et sœurs qui se réunit dans les maisons. Ces groupes sont des extensions de l’église, qui rapprochent la communauté de l’endroit où vous vivez.</p>
        </div>
      </section>

      <section className="banner" style={{ backgroundImage: 'url(/img/image.jpg)', minHeight: 'clamp(18rem, 50svh, 32rem)' }} aria-hidden />

      <section className="section">
        <div className="container">
          <div className="head-split">
            <h2 className="h2">Qu’est-ce qu’une <span className="accent">cellule ?</span></h2>
            <p className="lead">Une cellule est un petit groupe de croyants qui se réunit régulièrement pour grandir dans la foi. Accueillants et de petite taille (7 à 15 personnes), ces groupes permettent à chacun de participer, de progresser dans la connaissance de Christ et de bâtir des relations durables.</p>
          </div>
          <div className="grid g4 mt">
            {[['Louange et prière', 'Fortifier la foi par une dévotion partagée.', '/img/gallery1.jpg'], ['Enseignement biblique', 'Apprendre et grandir dans la Parole.', '/img/discover2.jpg'], ['Communion et soutien', 'S’encourager mutuellement dans la foi.', '/img/gallery3.jpg'], ['Évangélisation', 'Atteindre ceux qui ne connaissent pas encore Christ.', '/img/Link.jpg']].map(([t, p, img]) => (
              <div key={t} className="tile" style={{ backgroundImage: `url(${img})` }}><span /><div><h3>{t}</h3><p>{p}</p></div></div>))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container head-split">
          <h2 className="h2">Pourquoi rejoindre une <span className="accent">cellule ?</span></h2>
          <div className="grid g2">
            {[['Communauté plus forte', 'Grandir dans la foi avec un groupe soudé de croyants.'], ['Croissance spirituelle', 'Approfondir votre foi par la prière, l’étude biblique et le partage d’expériences.'], ['Formation de leaders', 'Entrer dans votre appel en dirigeant et en servant dans votre cellule.'], ['Extension du Royaume', 'Faire partie d’un mouvement qui amène l’église dans plus de foyers et de cœurs.']].map(([t, p]) => (
              <div className="card" key={t}><h3>{t}</h3><p>{p}</p></div>))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container head-split">
          <h2 className="h2">L’essence d’une cellule <span className="accent">saine</span></h2>
          <div className="grid g2">
            {[['Redevabilité', 'Nous nous soutenons et nous encourageons pour grandir ensemble.'], ['Entraide', 'Nous prenons soin des besoins les uns des autres, de toutes les manières.'], ['Croissance spirituelle', 'Nous progressons dans la joie de la foi.'], ['Rayonnement', 'Nous touchons de nouvelles personnes pour Dieu, dans différentes villes.']].map(([t, p], i) => (
              <div className="card" key={t}><span className="num">{i + 1}</span><h3>{t}</h3><p>{p}</p></div>))}
          </div>
        </div>
      </section>

      <section className="section bg-dark" id="rejoindre">
        <div className="container head-split">
          <div className="stack">
            <h2 className="h2">Trouver une cellule <span className="accent">près de vous</span></h2>
            <p className="lead">Indiquez votre quartier : nous vous mettons en relation avec le responsable le plus proche.</p>
          </div>
          <RequestForm type="cell_join" submitLabel="Me rattacher à une cellule" fields={[...IDENT, { name: 'zone', label: 'Votre quartier', required: true }, CONSENT]} />
        </div>
      </section>

      <section className="section bg-cream" id="inscrire">
        <div className="container head-split">
          <div className="stack">
            <h2 className="h2">Enregistrer une <span className="accent">cellule</span></h2>
            <p className="lead">Vous hébergez ou souhaitez lancer une cellule ? Déclarez-la ici.</p>
          </div>
          <RequestForm type="cell_register" submitLabel="Enregistrer ma cellule" fields={[...IDENT, { name: 'zone', label: 'Quartier / adresse', required: true }, { name: 'jour', label: 'Jour et heure de rencontre' }, CONSENT]} />
        </div>
      </section>
    </>
  );
}
