import Link from 'next/link';
import Hero from '@/components/Hero';

export const metadata = { title: 'Projet de construction' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Vision" title="Projet de" accent="construction" text="Bâtir une maison pour accueillir toujours plus de vies transformées." image="/img/fond1.jpg" />
      <section className="section">
        <div className="container center stack">
          <h2 className="h2">Participez à la <span className="accent">construction</span></h2>
          <p className="lead">[Description du projet, budget et avancement à fournir par l’église.]</p>
          <div className="btn-row center"><Link href="/give" className="btn btn-navy">Donner maintenant</Link></div>
        </div>
      </section>
    </>
  );
}
