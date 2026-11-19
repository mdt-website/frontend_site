import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { listSermons, shape, youtubeId } from '@/lib/sermons';
import SermonsNav from '../SermonsNav';
import SermonCard from '../SermonCard';

export const dynamic = 'force-dynamic';

async function get(slug) {
  try { const s = await db.sermon.findFirst({ where: { published: true, OR: [{ slug }, { id: slug }] } }); return s && shape(s); } catch { return null; }
}

export async function generateMetadata({ params }) {
  const s = await get((await params).slug);
  return s ? { title: s.title, description: s.description || `${s.speaker} · ${s.date}` } : {};
}

export default async function Page({ params }) {
  const s = await get((await params).slug);
  if (!s) notFound();
  const id = youtubeId(s.url);
  const more = (await listSermons(s.series ? { series: s.series } : {}, 7)).filter((x) => x.id !== s.id).slice(0, 3);
  return (
    <>
      <SermonsNav current="" />
      <section className="section"><div className="container" style={{ maxWidth: 900 }}>
        <h1 className="h2">{s.title}</h1>
        <p>{s.speaker} · {s.date}{s.series && <> · <Link href={`/sermons/series/${encodeURIComponent(s.series)}`}>{s.series}</Link></>}</p>
        {id
          ? <iframe title={s.title} src={`https://www.youtube-nocookie.com/embed/${id}`} allow="encrypted-media; picture-in-picture" allowFullScreen style={{ border: 0, width: '100%', aspectRatio: '16 / 9', borderRadius: 14, margin: '1rem 0' }} />
          : <p><a className="btn btn-navy" href={s.url} target="_blank" rel="noopener noreferrer">Regarder le sermon</a></p>}
        {s.audioUrl && <p><a href={s.audioUrl} target="_blank" rel="noopener noreferrer">Écouter l’audio</a></p>}
        {s.description && s.description.split(/(?:\r?\n){2,}/).map((p, i) => <p className="lead" key={i}>{p}</p>)}
        {s.tags.length > 0 && <p className="btn-row">{s.tags.map((t) => <Link className="filter" key={t} href={`/sermons?theme=${encodeURIComponent(t)}`}>{t}</Link>)}</p>}
      </div></section>
      {more.length > 0 && <section className="section bg-cream"><div className="container"><h2 className="h2 center">À voir <span className="accent">aussi</span></h2><div className="grid g3 mt">{more.map((x) => <SermonCard key={x.id} s={x} />)}</div></div></section>}
    </>
  );
}
