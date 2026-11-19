import Link from 'next/link';
import Hero from '@/components/Hero';
import { MINISTRIES } from '@/lib/site';

export const metadata = { title: 'Ministères' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Impliquez-vous" title="Il y a une place" accent="pour chacun" text="Nos ministères sont l’expression de notre mandat d’église. Nous servons Dieu par Son Esprit, avec joie." image="/img/evhea1.jpg" />
      {MINISTRIES.map((m, i) => (
        <section key={m.id} id={m.id} className={`section ${i % 2 ? 'bg-cream' : ''}`}>
          <div className={`container split ${i % 2 ? 'rev' : ''}`}>
            <img src={m.img} alt={m.title} />
            <div className="stack">
              <span className="pill" style={{ color: 'var(--navy)' }}>Ministère</span>
              <h2 className="h2">{m.title}</h2>
              <p className="lead">{m.text}</p>
              <Link className="btn btn-navy" href="/volunteers">Servir ici</Link>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
