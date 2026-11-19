import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import RequestForm from '@/components/RequestForm';
import { db } from '@/lib/db';
import { fmtDateTime } from '@/lib/format';
import { CAMPUSES } from '@/lib/campuses';
import { IDENT, CONSENT } from '@/lib/fields';

export const dynamic = 'force-dynamic';

async function getEvent(id) {
  try { return await db.event.findFirst({ where: { id, published: true } }); } catch { return null; }
}

export async function generateMetadata({ params }) {
  const e = await getEvent((await params).id);
  return e ? { title: e.title, description: e.description || undefined } : {};
}

export default async function EventPage({ params }) {
  const e = await getEvent((await params).id);
  if (!e) notFound();
  const past = e.startsAt < new Date(Date.now() - 6 * 3600_000);
  const fields = [...IDENT, { name: 'personnes', label: 'Nombre de personnes (vous inclus)', type: 'text' }, CONSENT];
  return (
    <>
      <Hero eyebrow={fmtDateTime(e.startsAt)} title={e.title} text={[e.location, e.campus && CAMPUSES[e.campus]?.name].filter(Boolean).join(' · ')} image="/img/fond1.jpg" />
      <section className="section"><div className="container" style={{ maxWidth: 780 }}>
        {e.description && e.description.split(/(?:\r?\n){2,}/).map((p, i) => <p className="lead" key={i}>{p}</p>)}
        <p><Link href="/dp">Créer mon visuel personnalisé pour partager l’événement</Link></p>
        {past
          ? <p className="note">Cet événement est terminé.</p>
          : <><h2 className="h2" style={{ margin: '2rem 0 1rem' }}>S’<span className="accent">inscrire</span></h2><RequestForm type="event_register" fields={fields} extra={{ evenement: e.title }} submitLabel="Je m’inscris" successMessage="Votre inscription est enregistrée. À bientôt !" /></>}
      </div></section>
    </>
  );
}
