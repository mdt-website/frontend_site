import { listSermons } from '@/lib/sermons';
import SermonsNav from '../SermonsNav';
import SermonCard from '../SermonCard';

export const metadata = { title: 'Recherche de sermons' };
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const q = String((await searchParams).q || '').trim().slice(0, 80);
  const n = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const all = await listSermons();
  const res = q ? all.filter((s) => n(`${s.title} ${s.speaker} ${s.series || ''} ${s.tags.join(' ')} ${s.description || ''}`).includes(n(q))) : [];
  return (
    <>
      <SermonsNav current="search" />
      <section className="section"><div className="container">
        <form method="get" className="center" role="search"><input name="q" defaultValue={q} placeholder="Rechercher un sermon, un thème, un prédicateur…" aria-label="Rechercher" style={{ width: 'min(100%, 560px)', padding: '.9rem 1.2rem', borderRadius: 999, border: '1px solid var(--gold-deep)', font: 'inherit' }} /> <button className="btn btn-navy">Rechercher</button></form>
        {q && <p className="center mt">{res.length} résultat{res.length > 1 ? 's' : ''} pour « {q} »</p>}
        <div className="grid g3 mt">{res.map((s) => <SermonCard key={s.id} s={s} />)}</div>
      </div></section>
    </>
  );
}
