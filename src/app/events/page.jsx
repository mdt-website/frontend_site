import Hero from '@/components/Hero';
import { SERVICES } from '@/lib/site';
import { db } from '@/lib/db';
import { fmtDateTime } from '@/lib/format';

export const metadata = { title: 'Événements' };
export const revalidate = 60;

const PROGRAMMES = [['Classe Basic', 'Niveaux 1 et 2 : fondements de la foi.'], ['Mercredi de Gloire', 'Rendez-vous d’enseignement et de prière.'], ['Veillée des célibataires', 'Une série de veillées dédiée aux célibataires.']];

async function getEvents() {
  try {
    return await db.event.findMany({ where: { published: true, startsAt: { gte: new Date(Date.now() - 6 * 3600_000) } }, orderBy: { startsAt: 'asc' }, take: 30 });
  } catch {
    return [];
  }
}

export default async function Page() {
  const events = await getEvents();
  return (
    <>
      <Hero eyebrow="Nos programmes" title="Les" accent="événements" image="/img/evhea1.jpg" />
      <section className="section">
        <div className="container">
          {events.length > 0 && (
            <>
              <h2 className="h2" style={{ marginBottom: '2rem' }}>À <span className="accent">venir</span></h2>
              <div className="grid g3" style={{ marginBottom: '4rem' }}>
                {events.map((e) => (
                  <div className="card" key={e.id}><p className="eyebrow" style={{ color: 'var(--gold-text)', fontWeight: 700, fontSize: 'var(--fs-small)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{fmtDateTime(e.startsAt)}</p><h3>{e.title}</h3>{e.location && <p>{e.location}</p>}{e.description && <p>{e.description}</p>}<p><a href={`/events/${e.id}`}>Détails et inscription</a></p></div>
                ))}
              </div>
            </>
          )}
          <h2 className="h2" style={{ marginBottom: '2rem' }}>Rendez-vous <span className="accent">réguliers</span></h2>
          <div className="grid g3">
            {SERVICES.map((s) => <div className="card" key={s.day}><h3>{s.day}</h3><p>{s.label}</p><p><strong>{s.times.join(' · ')}</strong></p></div>)}
            {PROGRAMMES.map(([t, p]) => <div className="card" key={t}><h3>{t}</h3><p>{p}</p></div>)}
          </div>
          {events.length === 0 && <p className="note">[Dates et horaires à publier par l’église depuis le back-office.]</p>}
        </div>
      </section>
    </>
  );
}
