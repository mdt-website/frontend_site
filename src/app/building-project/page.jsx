import Link from 'next/link';
import Hero from '@/components/Hero';

export const metadata = { title: 'Projet de construction' };

const WAYS = [
  ['Mobile Money', 'MTN MoMo / Moov Money', 'Numéro à communiquer par l’église'],
  ['Virement bancaire', 'Compte du projet', 'Coordonnées à communiquer par l’église'],
  ['Sur place', 'Chaque dimanche', 'Pendant le temps d’offrande'],
];

export default function Page() {
  return (
    <>
      <Hero eyebrow="Projet de construction" title="Bâtissez" accent="avec nous" text="Votre soutien permet d’accueillir toujours plus de vies transformées." image="/img/fond1.jpg">
        <div className="btn-row center"><a className="btn btn-gold" href="#moyens">Donner maintenant</a></div>
      </Hero>

      <section className="section" id="moyens">
        <div className="container head-split">
          <div className="stack"><span className="pill" style={{ color: 'var(--navy)' }}>Façons de donner</span><h2 className="h2">Soutenir le <span className="accent">projet</span></h2><p className="lead">Choisissez le moyen qui vous convient.</p></div>
          <div className="stack">{WAYS.map(([t, s, d]) => <div className="row-card" key={t}><strong>{t}</strong><span>{s}</span><span style={{ flexBasis: '100%', fontSize: '.85em' }}>{d}</span></div>)}</div>
        </div>
      </section>

      <section className="section bg-dark">
        <div className="container head-split">
          <div className="stack"><span className="pill">Étendre notre portée</span><h2 className="h2">La vision de <span className="accent">notre bâtiment</span></h2></div>
          <div className="stack">
            <p className="lead">[Mot du pasteur sur la vision du bâtiment, état d’avancement et objectifs : à fournir par l’église.]</p>
            <p><strong style={{ color: 'var(--gold)' }}>Pasteur Herbert Donald</strong><br /><span style={{ opacity: .8 }}>Pasteur principal, La Maison de la Transformation</span></p>
            <div className="btn-row"><Link href="/give" className="btn btn-gold">Voir toutes les façons de donner</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
