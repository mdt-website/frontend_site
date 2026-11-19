import { notFound } from 'next/navigation';
import { listSermons } from '@/lib/sermons';
import SermonsNav from '../../SermonsNav';
import SermonCard from '../../SermonCard';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const name = decodeURIComponent((await params).name);
  const list = await listSermons({ series: name });
  if (!list.length) notFound();
  return (
    <>
      <SermonsNav current="series" />
      <section className="section"><div className="container">
        <h2 className="h2 center">{name}</h2>
        <div className="grid g3 mt">{list.map((s) => <SermonCard key={s.id} s={s} />)}</div>
      </div></section>
    </>
  );
}
