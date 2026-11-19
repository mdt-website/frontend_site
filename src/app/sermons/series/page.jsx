import Link from 'next/link';
import { listSermons } from '@/lib/sermons';
import SermonsNav from '../SermonsNav';

export const metadata = { title: 'Séries de sermons' };
export const dynamic = 'force-dynamic';

export default async function Page() {
  const all = await listSermons();
  const map = new Map();
  for (const s of all) if (s.series) map.set(s.series, [...(map.get(s.series) || []), s]);
  return (
    <>
      <SermonsNav current="series" />
      <section className="section"><div className="container">
        <h2 className="h2 center">Séries</h2>
        <div className="grid g3 mt">
          {[...map.entries()].map(([name, list]) => (
            <Link key={name} href={`/sermons/series/${encodeURIComponent(name)}`} className="media-card">
              <div className="img" style={list[0].thumb ? { backgroundImage: `url(${list[0].thumb})` } : { background: 'var(--navy)' }} role="img" aria-label={name} />
              <h3>{name}</h3><p>{list.length} sermon{list.length > 1 ? 's' : ''}</p>
            </Link>
          ))}
          {map.size === 0 && <p className="center lead" style={{ gridColumn: '1 / -1' }}>Aucune série pour le moment.</p>}
        </div>
      </div></section>
    </>
  );
}
