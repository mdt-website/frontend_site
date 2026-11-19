import Link from 'next/link';
import Hero from '@/components/Hero';
import { TESTIMONIES } from '@/lib/faq';

export const metadata = { title: 'À propos' };

export default function About() {
  return (
    <>
      <Hero eyebrow="La famille de la MDT" title="Transformés" accent="de gloire en gloire" text="Nous servons Dieu par Son Esprit." image="/img/con.jpg" />

      <section className="section">
        <div className="container stack" style={{ maxWidth: 900 }}>
          <p className="lead" style={{ maxWidth: 'none', color: 'var(--ink)' }}>La Maison de la Transformation (MDT) est une église d’enseignement et de mission basée à Abomey-Calavi, au Bénin. Notre vision : voir tous les hommes transformés à l’image de Christ, de gloire en gloire.</p>
          <p className="lead" style={{ maxWidth: 'none' }}>Nous cultivons la croissance spirituelle par l’enseignement approfondi de la Parole, la prière et l’action auprès de la communauté, afin que chaque croyant vive sa foi avec courage et joie.</p>
          <p className="note" style={{ textAlign: 'left' }}>[Texte à valider avec le pasteur : histoire, date de fondation, chiffres.]</p>
        </div>
      </section>

      <section className="banner" style={{ backgroundImage: 'url(/img/discover1.jpg)', alignItems: 'center' }}>
        <div className="container">
          <div className="card" style={{ maxWidth: 620, color: 'var(--ink)' }}>
            <h2 className="h2" style={{ fontSize: 'var(--fs-h2)', color: 'var(--ink)' }}>Nous <span className="accent" style={{ color: 'var(--gold-text)' }}>croyons</span></h2>
            <ul className="stack" style={{ marginTop: '1.2rem' }}>
              {['Que la plus grande preuve de l’amour du Père pour nous est l’œuvre rédemptrice de Christ.',
                'Que la Parole de Dieu est la norme ultime de la doctrine.',
                'Que les dons de l’Esprit sont à l’œuvre dans la vie du croyant : prière, prophétie et chants spirituels.',
                'Que nous sommes bénis car la justice nous est attribuée par la grâce de notre Seigneur Jésus-Christ.'].map((t) => <li key={t} style={{ paddingLeft: '1.2rem', position: 'relative', fontSize: '.95em', color: 'var(--muted)' }}><span style={{ position: 'absolute', left: 0, color: 'var(--gold-deep)' }}>•</span>{t}</li>)}
            </ul>
            <p className="note" style={{ textAlign: 'left' }}>[Déclaration de foi à confirmer par l’église.]</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center stack">
            <h2 className="h2">Notre approche</h2>
            <p className="lead">Célébrer la vie en Christ demande que vous…</p>
          </div>
          <div className="grid g3 mt">
            {[['Le connaître', 'La Parole de Dieu est enseignée pour que chaque membre connaisse et comprenne la seigneurie de Jésus et progresse dans la joie de la foi.'],
              ['Le vivre', 'Votre vie doit refléter la mort et la résurrection de Jésus-Christ chaque jour. Savoir que Jésus est Seigneur ne suffit pas : il faut le vivre en tout.'],
              ['Le proclamer', 'Célébrer l’œuvre achevée de Jésus, c’est la partager avec le monde et proclamer Son amour et Sa grâce à autant de personnes que possible.']].map(([t, p]) => (
              <div key={t}><div className="mark" /><h3 style={{ color: 'var(--navy)' }}>{t}</h3><p className="lead" style={{ fontSize: '.95em', marginTop: '.5rem' }}>{p}</p></div>))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container">
          <div className="center stack">
            <span className="pill" style={{ color: 'var(--navy)' }}>Témoignages de membres</span>
            <h2 className="h2">Des vies <span className="accent">transformées</span></h2>
          </div>
          {TESTIMONIES.length ? (
            <div className="grid g3 mt">{TESTIMONIES.map((t) => <article className="testi" key={t.title}><h3>{t.title}</h3><p>{t.text}</p><footer>{t.author}</footer></article>)}</div>
          ) : (
            <div className="center stack mt"><p className="lead">Vous avez vécu quelque chose avec Dieu à la MDT ? Partagez-le pour encourager d’autres personnes.</p><Link className="btn btn-navy" href="/testimony">Partager mon témoignage</Link></div>
          )}
        </div>
      </section>

      <section className="section bg-dark" id="pasteur">
        <div className="container split">
          <img loading="lazy" src="/img/pasteur1.jpg" alt="Pasteur Herbert Donald" />
          <div className="stack">
            <h2 className="h2">Notre pasteur <span className="accent">principal</span></h2>
            <h3 style={{ color: 'var(--gold)' }}>Héribert Donald Mélé</h3>
            <p className="lead">Chaque dimanche, nous nous réunissons pour célébrer Sa présence, recevoir Sa Parole et expérimenter Son amour transformateur. Que vous cherchiez une communauté, une restauration personnelle ou un moment de communion avec Dieu, vous êtes les bienvenus.</p>
            <p className="lead">Notre désir est que chacun vive une transformation profonde, guidée par le Saint-Esprit.</p>
            <Link className="btn btn-outline" href="/contact">Écrire à l’église</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="center stack"><span className="pill" style={{ color: 'var(--navy)' }}>Communauté</span><h2 className="h2">Nous vivons la communauté <span className="accent">autrement</span></h2><p className="lead">Plus qu’une église, un lieu où grandir.</p></div>
          <div className="grid g3 mt">
            {[['Classes de membres', 'Des enseignements bibliques précis pour poser un solide fondement à votre croissance spirituelle.', '/membership-class', '/img/about.jpg'],
              ['Célébrations', 'Vous êtes une réponse à nos prières : nous vous célébrons chaque jour, surtout dans vos moments spéciaux.', '/celebrations', '/img/gallery3.jpg'],
              ['Accompagnement', 'Quelqu’un est toujours disponible pour prier avec vous et vous conseiller, sans jugement.', '/counselling', '/img/discover1.jpg']].map(([t, p, h, img]) => (
              <Link key={h} href={h} className="media-card"><div className="img" style={{ backgroundImage: `url(${img})` }} /><h3>{t} →</h3><p>{p}</p></Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
