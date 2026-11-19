import Hero from '@/components/Hero';
import SermonList from './SermonList';
import { SITE } from '@/lib/site';
import { db } from '@/lib/db';
import { fmtDate } from '@/lib/format';

export const metadata = { title: 'Sermons' };
export const revalidate = 60;

async function getSermons() {
  try {
    const rows = await db.sermon.findMany({ where: { published: true }, orderBy: { date: 'desc' }, take: 60 });
    return rows.map((s) => ({ id: s.id, title: s.title, speaker: s.speaker, date: fmtDate(s.date), url: s.url, tags: s.tags.split(',').map((t) => t.trim()).filter(Boolean) }));
  } catch {
    return []; // base indisponible : la page reste utilisable (lien YouTube)
  }
}

export default async function Page() {
  const sermons = await getSermons();
  return (
    <>
      <Hero eyebrow="Médias" title="Derniers" accent="sermons" text="Les enseignements de la Maison de la Transformation." image="/img/pasteur1.jpg" />
      <section className="section"><SermonList sermons={sermons} channel={SITE.youtube} /></section>
    </>
  );
}
