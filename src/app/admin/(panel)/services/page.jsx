import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { CAMPUS_LIST, CAMPUSES } from '@/lib/campuses';
import { can } from '@/lib/crm';
import { fmtDateTime } from '@/lib/format';
import { createService, toggleService } from '../../actions';

export default async function Services({ searchParams }) {
  const user = await requireUser();
  const sp = await searchParams;
  const rows = await db.service.findMany({ orderBy: { date: 'desc' }, take: 40, include: { _count: { select: { attendance: true } } } });
  const manage = can.manageContent(user);
  return (
    <>
      <h1>Cultes et présence</h1>
      <p className="adm__msg">Créez un culte : un code à 4 chiffres est généré. Affichez-le à l’écran pendant le culte ; les fidèles le saisissent sur <strong>/checkin</strong> pour signaler leur présence. Fermez le culte ensuite.</p>
      {sp.error && <p className="adm__msg adm__msg--err" role="alert">Date invalide.</p>}
      {manage && (
        <form action={createService} className="adm__panel adm__form">
          <div className="adm__row2">
            <div><label htmlFor="title">Intitulé</label><input id="title" name="title" defaultValue="Culte de célébration" /></div>
            <div><label htmlFor="date">Date et heure (Bénin) *</label><input id="date" name="date" type="datetime-local" required /></div>
          </div>
          <div><label htmlFor="campus">Lieu</label><select id="campus" name="campus">{CAMPUS_LIST.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
          <div><button className="adm__btn">Créer et générer le code</button></div>
        </form>
      )}
      <div className="adm__scroll"><table>
        <thead><tr><th>Date</th><th>Culte</th><th>Lieu</th><th>Code</th><th>Présents</th><th>État</th><th /></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={7}>Aucun culte.</td></tr>}
          {rows.map((s) => (
            <tr key={s.id}>
              <td>{fmtDateTime(s.date)}</td><td>{s.title}</td><td>{CAMPUSES[s.campus]?.name || s.campus}</td>
              <td><strong style={{ fontSize: '1.3rem', letterSpacing: '.15em' }}>{s.open ? s.code : '····'}</strong></td>
              <td>{s._count.attendance} {s._count.attendance > 0 && <a href={`/api/admin/export/attendance?service=${s.id}`}>(CSV)</a>}</td>
              <td><span className={`badge ${s.open ? 'badge--IN_PROGRESS' : 'badge--ARCHIVED'}`}>{s.open ? 'Ouvert' : 'Fermé'}</span></td>
              <td>{manage && s.open && <><a href={`/api/admin/checkin-image?service=${s.id}&format=landscape`} target="_blank" rel="noopener noreferrer">Projeter</a> · <a href={`/api/admin/checkin-image?service=${s.id}&format=portrait&download=1`}>Portrait</a> </>}{manage && <form action={toggleService}><input type="hidden" name="id" value={s.id} /><button className="adm__btn adm__btn--ghost adm__btn--sm">{s.open ? 'Fermer' : 'Rouvrir'}</button></form>}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </>
  );
}
