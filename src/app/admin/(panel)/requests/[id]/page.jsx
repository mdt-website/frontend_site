import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { FORMS } from '@/lib/forms';
import { can, FIELD_LABELS, REQUEST_TYPES, SENSITIVE_TYPES, STATUS } from '@/lib/crm';
import { fmtDateTime } from '@/lib/format';
import { updateRequest } from '../../../actions';

export default async function RequestDetail({ params, searchParams }) {
  const user = await requireUser();
  const { id } = await params;
  const sp = await searchParams;
  const r = await db.request.findUnique({ where: { id }, include: { person: true } });
  if (!r) notFound();
  if (SENSITIVE_TYPES.has(r.type) && !can.seeSensitive(user)) notFound();
  const users = await db.user.findMany({ where: { active: true }, orderBy: { name: 'asc' } });
  let data = {};
  try { data = JSON.parse(r.data); } catch { /* données illisibles */ }

  return (
    <>
      <p><Link href="/admin/requests">← Toutes les demandes</Link></p>
      <h1>{REQUEST_TYPES[r.type] || r.type}</h1>
      {sp.saved && <p className="adm__msg" role="status">Modifications enregistrées.</p>}
      <div className="adm__panel">
        <dl>
          <dt>Reçue le</dt><dd>{fmtDateTime(r.createdAt)}</dd>
          <dt>Personne</dt><dd>{r.person ? <Link href={`/admin/people/${r.person.id}`}>{r.person.name}</Link> : '—'}</dd>
          {Object.entries(data).filter(([k]) => k !== 'nom').map(([k, v]) => (
            <Fragment key={k}><dt>{FORMS[r.type]?.fields.find((f) => f.name === k)?.label || FIELD_LABELS[k] || k}</dt><dd>{typeof v === 'boolean' ? (v ? 'Oui' : 'Non') : String(v)}</dd></Fragment>
          ))}
        </dl>
      </div>
      <form action={updateRequest} className="adm__panel adm__form">
        <input type="hidden" name="id" value={r.id} />
        <div className="adm__row2">
          <div><label htmlFor="status">Statut</label><select id="status" name="status" defaultValue={r.status}>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
          <div><label htmlFor="assignedToId">Responsable</label><select id="assignedToId" name="assignedToId" defaultValue={r.assignedToId || ''}><option value="">Non assignée</option>{users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
        </div>
        <div><label htmlFor="notes">Notes de suivi (internes)</label><textarea id="notes" name="notes" rows={5} defaultValue={r.notes || ''} /></div>
        <div><button className="adm__btn">Enregistrer</button></div>
      </form>
    </>
  );
}
