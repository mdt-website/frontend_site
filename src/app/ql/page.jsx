import Link from 'next/link';
import Hero from '@/components/Hero';
import { QUICK_LINKS } from '@/lib/site';

export const metadata = { title: 'Liens rapides' };

export default function QL() {
  return (
    <>
      <Hero eyebrow="Liens rapides" title="Bienvenue à la" accent="Maison de la Transformation" image="/img/fond2.jpg" />
      <section className="section bg-cream">
        <div className="container"><div className="ql-list">
          {QUICK_LINKS.map(([l, h]) => <Link key={h} href={h}><span>{l}</span><span aria-hidden>→</span></Link>)}
        </div></div>
      </section>
    </>
  );
}
