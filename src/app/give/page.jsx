import Link from 'next/link';
import Hero from '@/components/Hero';
import Faq from '@/components/Faq';
import RequestForm from '@/components/RequestForm';
import { FAQ_GIVE } from '@/lib/faq';

export const metadata = { title: 'Donner' };

// Coordonnées de don à fournir par l'église (aucun numéro inventé).
const METHODS = [
  ['Mobile Money', 'MTN MoMo / Moov Money', 'Numéro à communiquer par l’église'],
  ['Virement bancaire', 'Banque et numéro de compte', 'Coordonnées à communiquer par l’église'],
  ['Sur place', 'Pendant le temps d’offrande', 'Chaque dimanche'],
];

export default function Page() {
  return (
    <>
      <Hero eyebrow="Donner" title="Votre générosité," accent="notre mission" text="Donnez pour soutenir la vision de la Maison de la Transformation et l’avancement de l’Évangile." image="/img/fond2.jpg">
        <div className="btn-row center"><a className="btn btn-gold" href="#moyens">Donner maintenant</a><Link className="btn btn-outline" href="/building-project">Autres façons de donner</Link></div>
      </Hero>

      <section className="section" id="moyens">
        <div className="container head-split">
          <div className="stack">
            <span className="pill" style={{ color: 'var(--navy)' }}>Donner à la MDT</span>
            <h2 className="h2">Façons de <span className="accent">donner</span></h2>
            <p className="lead">Joignez-vous à nous pour mettre notre argent là où se trouve notre foi, en nous associant à Dieu pour la propagation de l’Évangile aujourd’hui.</p>
            <p className="quote">« Que chacun donne comme il l’a résolu en son cœur, sans tristesse ni contrainte, car Dieu aime celui qui donne avec joie. »<cite>2 Corinthiens 9:7</cite></p>
          </div>
          <div className="stack">
            {METHODS.map(([t, s, d]) => <div className="row-card" key={t}><strong>{t}</strong><span>{s}</span><span style={{ flexBasis: '100%', fontSize: '.85em' }}>{d}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container">
          <div className="center stack" style={{ marginBottom: '2.5rem' }}>
            <h2 className="h2">Donner à un <span className="accent">lieu précis</span></h2>
            <p className="lead">Annoncez votre don pour que l’équipe puisse l’enregistrer et vous remercier.</p>
          </div>
          <RequestForm type="donation" form="donation" submitLabel="Annoncer mon don" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center stack" style={{ marginBottom: '2.5rem' }}><h2 className="h2">Questions <span className="accent">fréquentes</span></h2></div>
          <Faq items={FAQ_GIVE} />
        </div>
      </section>
    </>
  );
}
