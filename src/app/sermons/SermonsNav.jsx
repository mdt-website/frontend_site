import Link from 'next/link';

// Barre de navigation de l'espace sermons : Accueil, Recherche, Séries, En direct, Visiter la MDT (comme sermons.joincci.org)
export default function SermonsNav({ current }) {
  const items = [['', 'Accueil', '/sermons'], ['search', 'Recherche', '/sermons/search'], ['series', 'Séries', '/sermons/series'], ['live', 'En direct', '/sermons/live']];
  return (
    <nav className="sermons-nav" aria-label="Sermons">
      <div className="container">
        {items.map(([k, l, h]) => <Link key={k} href={h} aria-current={current === k ? 'page' : undefined}>{l}</Link>)}
        <Link href="/">Visiter la MDT</Link>
      </div>
    </nav>
  );
}
