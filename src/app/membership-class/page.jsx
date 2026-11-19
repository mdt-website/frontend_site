import Link from 'next/link';
import Hero from '@/components/Hero';

export const metadata = { title: 'Classes de membres' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Bienvenue à la MDT" title="Classes de" accent="membres" text="Des enseignements bibliques précis pour poser une base solide à votre croissance spirituelle." image="/img/about.jpg">
        <div className="btn-row center"><Link className="btn btn-gold" href="/membership-class/enrol">Nouvelle inscription</Link><Link className="btn btn-outline" href="/membership-class/certificate">Classe terminée</Link></div>
      </Hero>
      <section className="section bg-cream">
        <div className="container">
          <div className="center stack"><span className="pill" style={{ color: 'var(--navy)' }}>Communauté</span><h2 className="h2">Nos <span className="accent">classes</span></h2><p className="lead">Inscrivez-vous à l’une de nos classes de membres.</p></div>
          <div className="grid g3 mt">
            {[['Nouvelle inscription', 'Inscrivez-vous à la prochaine session des classes de membres.', 'Je m’inscris', '/membership-class/enrol'],
              ['Cours de rattrapage', 'Un cours manqué ? Rattrapez-le ici.', 'Rattraper', '/membership-class/makeup'],
              ['Classes terminées', 'Vous avez terminé tous les cours ? Inscrivez-vous pour obtenir votre certificat.', 'Obtenir mon certificat', '/membership-class/certificate']].map(([t, p, b, h]) => (
              <div className="card stack" key={h}><h3>{t}</h3><p>{p}</p><Link href={h} className="btn btn-navy">{b}</Link></div>))}
          </div>
        </div>
      </section>
    </>
  );
}
