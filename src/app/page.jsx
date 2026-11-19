import Link from 'next/link';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import { MINISTRIES, SITE } from '@/lib/site';

const PROGRAMMES = [
  ['Culte de célébration', 'Dimanche · 08h00 et 17h00', '/img/church-image.jpg'],
  ['Classe Basic', 'Niveaux 1 et 2', '/img/discover2.jpg'],
  ['Mercredi de Gloire', 'Enseignement et prière', '/img/gallery1.jpg'],
  ['Veillée des célibataires', 'Série de veillées', '/img/evhea1.jpg'],
];

export default function Home() {
  return (
    <>
      {/* 1. Hero plein écran */}
      <Hero page={false} eyebrow="Notre vision" title="Transformés à Son image" accent="de gloire en gloire" image="/img/church-image.jpg">
        <div className="btn-row center" style={{ marginTop: '2rem' }}>
          <a className="btn btn-white" href={SITE.youtube} target="_blank" rel="noopener noreferrer">Regarder en direct</a>
          <Link className="btn btn-outline" href="/ql">Liens rapides</Link>
        </div>
        <Countdown />
      </Hero>
      <div className="float-pill"><Link className="btn btn-gold" href="/building-project">Projet de construction</Link></div>

      {/* 2. Bienvenue + 3 tuiles */}
      <section className="section">
        <div className="container">
          <span className="pill" style={{ color: 'var(--navy)' }}>Bienvenue à la MDT</span>
          <h2 className="h2" style={{ marginTop: '1.2rem' }}>Bienvenue à la maison !</h2>
          <p className="lead" style={{ marginTop: '1rem' }}>Plongez dans nos enseignements, nos événements et notre communauté. Votre parcours de foi commence ici.</p>
          <div className="grid g3 mt">
            {[['Qui sommes-nous', 'À propos', 'En savoir plus', '/about', '/img/con.jpg'],
              ['Rejoindre la communauté', 'Se connecter', 'Devenir membre', '/membership', '/img/discover2.jpg'],
              ['Célébrer ensemble', 'Célébrations', 'En savoir plus', '/celebrations', '/img/gallery3.jpg']].map(([k, t, l, h, img]) => (
              <Link key={h} href={h} className="tile" style={{ backgroundImage: `url(${img})` }}>
                <div><small>{k}</small><h3>{t}</h3></div>
                <span className="link-arrow">{l}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section sombre : rejoignez-nous */}
      <section className="section bg-dark">
        <div className="container">
          <div className="center stack">
            <span className="pill">Nous rejoindre</span>
            <h2 className="h2" style={{ maxWidth: '20ch', marginInline: 'auto' }}>Nous enrôlons, formons <span className="accent">et envoyons</span> un peuple</h2>
            <p className="lead">Rejoignez-nous à la Maison de la Transformation, à Abomey-Calavi.</p>
            <div className="btn-row center"><Link href="/campuses" className="btn btn-outline">Voir le lieu et les horaires</Link></div>
          </div>
          <h3 className="h2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h3)', textTransform: 'uppercase', fontWeight: 800, margin: 'clamp(2.5rem, 2rem + 3vw, 5rem) 0 1.5rem' }}>Visiter la MDT</h3>
          <div className="grid g4">
            {PROGRAMMES.map(([t, s, img]) => (
              <Link key={t} href="/events" className="tile" style={{ backgroundImage: `url(${img})` }}>
                <span />
                <div><h3>{t}</h3><p>{s}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bannière plein écran */}
      <section className="banner" style={{ backgroundImage: 'url(/img/fond2.png)' }}>
        <div className="container stack">
          <h2 className="h2">Nous nous glorifions en <span className="accent">Christ Jésus</span></h2>
          <p className="lead">Notre plus belle réussite est la grâce de voir des personnes, autrefois simples chercheurs de Dieu, devenir des disciples mûrs et de vaillants serviteurs de l’Évangile.</p>
          <Link href="/about" className="btn btn-gold">En savoir plus</Link>
        </div>
      </section>

      {/* 5. Communauté */}
      <section className="section">
        <div className="container">
          <div className="center stack">
            <span className="pill" style={{ color: 'var(--navy)' }}>Communauté</span>
            <h2 className="h2">Nous vivons la communauté <span className="accent">autrement</span></h2>
            <p className="lead">Plus qu’une église, un lieu où grandir.</p>
          </div>
          <div className="grid g3 mt">
            {[['Classes de membres', 'Des enseignements bibliques précis pour poser un solide fondement à votre croissance spirituelle.', '/membership-class', '/img/about.jpg'],
              ['Célébrations', 'Vous êtes une réponse à nos prières : nous vous célébrons chaque jour, surtout dans vos moments spéciaux.', '/celebrations', '/img/gallery3.jpg'],
              ['Accompagnement', 'Quelqu’un est toujours disponible pour prier avec vous et vous conseiller, sans jugement.', '/counselling', '/img/discover1.jpg']].map(([t, p, h, img]) => (
              <Link key={h} href={h} className="media-card"><div className="img" style={{ backgroundImage: `url(${img})` }} /><h3>{t} →</h3><p>{p}</p></Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pasteur principal */}
      <section className="section bg-dark">
        <div className="container split">
          <img src="/img/PastorImage.jpg" alt="Pasteur Herbert Donald" style={{ objectPosition: 'top' }} />
          <div className="stack">
            <h2 className="h2">Notre pasteur <span className="accent">principal</span></h2>
            <p className="lead">Le pasteur Herbert Donald est le pasteur principal de La Maison de la Transformation, une église où le Seigneur œuvre puissamment pour nous transformer à Son image, de gloire en gloire, par l’enseignement de la Parole et la conduite du Saint-Esprit.</p>
            <div className="quote" style={{ color: 'rgba(255,255,255,.9)' }}>Que personne ne méprise ta jeunesse. Sois un modèle pour les fidèles, en parole, en conduite, en charité, en foi, en pureté.<cite>1 Timothée 4:12</cite></div>
            <Link href="/about#pasteur" className="btn btn-outline">Lire la suite</Link>
          </div>
        </div>
      </section>

      {/* 7. Ministères */}
      <section className="section">
        <div className="container head-split">
          <div className="stack">
            <span className="pill" style={{ color: 'var(--navy)' }}>Ministères</span>
            <h2 className="h2">Il y a une place pour <span className="accent">chacun</span></h2>
            <Link href="/ministries" className="btn btn-outline" style={{ color: 'var(--navy)' }}>Voir tous les ministères</Link>
          </div>
          <div className="grid g2">
            {MINISTRIES.slice(0, 2).map((m) => (
              <Link key={m.id} href={`/ministries#${m.id}`} className="media-card"><div className="img" style={{ backgroundImage: `url(${m.img})`, aspectRatio: '1 / 1' }} /><h3>{m.title}</h3><p>Visiter</p></Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
