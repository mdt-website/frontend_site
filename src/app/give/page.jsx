import Link from 'next/link';
import Hero from '@/components/Hero';

export const metadata = { title: 'Donner' };

// Coordonnées de don à fournir par l'église (aucun numéro inventé).
const METHODS = [
  ['Mobile Money', 'MTN MoMo / Moov Money : numéro à communiquer par l’église.'],
  ['Virement bancaire', 'Coordonnées bancaires à communiquer par l’église.'],
  ['Sur place', 'Pendant le temps d’offrande, lors des cultes du dimanche.'],
];

export default function Page() {
  return (
    <>
      <Hero eyebrow="Générosité" title="Donner à la" accent="Maison de la Transformation" text="Votre générosité continue de bénir des vies, merci de donner." image="/img/fond2.png" />
      <section className="section">
        <div className="container">
          <div className="center stack">
            <h2 className="h2">Comment <span className="accent">donner</span></h2>
            <p className="lead">« Que chacun donne comme il l’a résolu en son cœur, sans tristesse ni contrainte, car Dieu aime celui qui donne avec joie. » — 2 Corinthiens 9:7</p>
          </div>
          <div className="grid g3 mt">{METHODS.map(([t, p]) => <div className="card" key={t}><h3>{t}</h3><p>{p}</p></div>)}</div>
          <div className="btn-row center mt"><Link href="/building-project" className="btn btn-navy">Projet de construction</Link></div>
        </div>
      </section>
    </>
  );
}
