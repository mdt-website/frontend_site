import Link from 'next/link';
import { SITE } from '@/lib/site';
import { SERMON_THEMES, listSermons } from '@/lib/sermons';
import SermonsNav from './SermonsNav';
import SermonCard from './SermonCard';
import Greeting from './Greeting';

export const metadata = { title: 'Sermons', description: 'Les enseignements de la Maison de la Transformation.' };
export const dynamic = 'force-dynamic';

const STEP = 12;

export default async function Page({ searchParams }) {
  const sp = await searchParams;
  const theme = SERMON_THEMES.includes(sp.theme) ? sp.theme : '';
  const n = Math.min(120, Math.max(STEP, parseInt(sp.n || String(STEP), 10) || STEP));
  const all = await listSermons();
  const filtered = theme ? all.filter((s) => s.tags.includes(theme)) : all;
  const shown = filtered.slice(0, n);
  return (
    <>
      <SermonsNav current="" />
      <section className="section"><div className="container">
        <div className="btn-row center" role="group" aria-label="Thèmes">
          {SERMON_THEMES.map((t) => <Link key={t} className={`filter ${t === theme ? 'on' : ''}`} href={t === theme ? '/sermons' : `/sermons?theme=${encodeURIComponent(t)}`}>{t}</Link>)}
        </div>
        <div className="center stack mt"><Greeting /><h3 className="h3">Derniers sermons</h3></div>
        {shown.length === 0 ? (
          <div className="center stack mt">
            <p className="lead">Les derniers enseignements sont disponibles sur notre chaîne YouTube.</p>
            <a className="btn btn-navy" href={SITE.youtube} target="_blank" rel="noopener noreferrer">Regarder sur YouTube</a>
          </div>
        ) : <div className="grid g3 mt">{shown.map((s) => <SermonCard key={s.id} s={s} />)}</div>}
        {filtered.length > n && <p className="center mt"><Link className="btn btn-navy" href={`/sermons?${theme ? `theme=${encodeURIComponent(theme)}&` : ''}n=${n + STEP}`}>Voir plus</Link></p>}
      </div></section>
    </>
  );
}
