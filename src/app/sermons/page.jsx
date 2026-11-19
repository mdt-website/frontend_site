import Hero from '@/components/Hero';
import SermonList from './SermonList';
import { SITE } from '@/lib/site';

export const metadata = { title: 'Sermons' };
// Phase 2 : alimenté par l'API (titre, prédicateur, date, thèmes, lien).
const SERMONS = [];

export default function Page() {
  return (
    <>
      <Hero eyebrow="Médias" title="Derniers" accent="sermons" text="Les enseignements de la Maison de la Transformation." image="/img/pasteur1.jpg" />
      <section className="section"><SermonList sermons={SERMONS} channel={SITE.youtube} /></section>
    </>
  );
}
