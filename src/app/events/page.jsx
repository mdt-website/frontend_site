import Hero from '@/components/Hero';
import { SERVICES } from '@/lib/site';
import { db } from '@/lib/db';
import { fmtDateTime } from '@/lib/format';
import { CAMPUSES, CAMPUS_LIST, isCampus } from '@/lib/campuses';

export const metadata = { title: 'Événements' };

const PROGRAMMES = [['Classe Basic', 'Niveaux 1 et 2 : fondements de la foi.'], ['Mercredi de Gloire', 'Rendez-vous d’enseignement et de prière.'], ['Veillée des célibataires', 'Une série de veillées dédiée aux célibataires.']];

async function getEvents(campus) {
  try {
    return await db.event.findMany({ where: { published: true, ...(campus ? { OR: [{ campus: null }, { campus: '' }, { campus }] } : {}), startsAt: { gte: new Date(Date.now() - 6 * 3600_000) } }, orderBy: { startsAt: 'asc' }, take: 30 });
  } catch {
    return [];
  }
}

export default async function Page({ searchParams }) {
  const c = (await searchParams).campus;
  const campus = isCampus(c) ? c : '';
  const events = await getEvents(campus);
  return (
    <>
      <Hero eyebrow="Nos programmes" title="Les" accent="événements" image="/img/evhea1.jpg" />
      <section className="section">
        <div className="container">
          <p className="btn-row center" style={{ marginBottom: '2rem' }}>
            <a className={`filter${campus ? '' : ' on'}`} href="/events">Tous les lieux</a>
            {CAMPUS_LIST.map((l) => <a key={l.slug} className={`filter${campus === l.slug ? ' on' : ''}`} href={`/events?campus=${l.slug}`}>{l.name}</a>)}
          </p>
          <p className="note center">Horaires affichés à l’heure du Bénin (UTC+1) ; Lomé est à UTC+0, soit une heure de moins.</p>
          {events.length > 0 && (
            <>
              <h2 className="h2" style={{ marginBottom: '2rem' }}>À <span className="accent">venir</span></h2>
              <div className="grid g3" style={{ marginBottom: '4rem' }}>
                {events.map((e) => (
                  <div className="card" key={e.id}><p className="eyebrow" style={{ color: 'var(--gold-text)', fontWeight: 700, fontSize: 'var(--fs-small)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{fmtDateTime(e.startsAt)}</p><h3>{e.title}</h3>{(e.campus || e.location) && <p>{[e.campus && CAMPUSES[e.campus]?.name, e.location].filter(Boolean).join(' · ')}</p>}{e.description && <p>{e.description}</p>}<p><a href={`/events/${e.id}`}>Détails et inscription</a></p></div>
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
