import Hero from '@/components/Hero';
import { SERVICES } from '@/lib/site';

export const metadata = { title: 'Événements' };

const PROGRAMMES = [['Classe Basic', 'Niveaux 1 et 2 : fondements de la foi.'], ['Mercredi de Gloire', 'Rendez-vous d’enseignement et de prière.'], ['Veillée des célibataires', 'Une série de veillées dédiée aux célibataires.']];

export default function Page() {
  return (
    <>
      <Hero eyebrow="Nos programmes" title="Les" accent="événements" image="/img/evhea1.jpg" />
      <section className="section">
        <div className="container">
          <div className="grid g3">
            {SERVICES.map((s) => <div className="card" key={s.day}><h3>{s.day}</h3><p>{s.label}</p><p><strong>{s.times.join(' · ')}</strong></p></div>)}
            {PROGRAMMES.map(([t, p]) => <div className="card" key={t}><h3>{t}</h3><p>{p}</p></div>)}
          </div>
          <p className="note">[Dates et horaires à publier par l’église.]</p>
        </div>
      </section>
    </>
  );
}
