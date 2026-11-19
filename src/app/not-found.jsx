import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="hero hero--page center" style={{ background: 'var(--ink-dark)' }}>
      <div className="container stack">
        <h1 className="h1">404</h1>
        <p className="lead">Cette page est introuvable. Revenons à la maison.</p>
        <Link href="/" className="btn btn-gold">Accueil</Link>
      </div>
    </section>
  );
}
