import Hero from '@/components/Hero';
import { db } from '@/lib/db';
import DpMaker from './DpMaker';

export const metadata = { title: 'Mon visuel', description: 'Créez et partagez votre visuel personnalisé pour les événements de la Maison de la Transformation.' };
export const dynamic = 'force-dynamic';

export default async function Page() {
  let events = [];
  try { events = await db.event.findMany({ where: { published: true, startsAt: { gte: new Date() } }, orderBy: { startsAt: 'asc' }, take: 12, select: { id: true, title: true } }); } catch { /* base indisponible */ }
  const campaigns = [...events.map((e) => ({ id: e.id, title: e.title })), { id: 'mdt', title: 'Je fais partie de la Maison de la Transformation' }];
  return (
    <>
      <Hero eyebrow="Partager" title="Mon visuel" accent="personnalisé" text="Choisissez un événement, ajoutez votre photo et votre nom, puis téléchargez votre visuel." image="/img/fond1.jpg" />
      <section className="section"><div className="container"><DpMaker campaigns={campaigns} /></div></section>
    </>
  );
}
