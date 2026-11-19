import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { CAMPUS_LIST, CAMPUSES, isCampus } from '@/lib/campuses';
import { can, REQUEST_TYPES, SENSITIVE_TYPES, STATUS } from '@/lib/crm';
import { fmtDateTime } from '@/lib/format';

const PAGE = 25;

export default async function Requests({ searchParams }) {
  const user = await requireUser();
  const sp = await searchParams;
  const type = sp.type in REQUEST_TYPES ? sp.type : '';
  const status = sp.status in STATUS ? sp.status : '';
  const campus = isCampus(sp.campus) ? sp.campus : '';
  const q = String(sp.q || '').trim().slice(0, 80);
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1);

  const where = {
    ...(type ? { type } : {}),
    ...(status ? { status } : {}),
    ...(campus ? { campus } : {}),
    ...(q ? { person: { OR: [{ name: { contains: q } }, { phone: { contains: q } }, { email: { contains: q } }] } } : {}),
    ...(can.seeSensitive(user) ? {} : { type: type && !SENSITIVE_TYPES.has(type) ? type : { notIn: [...SENSITIVE_TYPES] } }),
  };
  const [rows, total] = await Promise.all([
    db.request.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * PAGE, take: PAGE, include: { person: true, assignedTo: true } }),
    db.request.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE));
  const qs = (p) => { const u = new URLSearchParams({ ...(type && { type }), ...(status && { status }), ...(campus && { campus }), ...(q && { q }), page: String(p) }); return `?${u}`; };

  return (
    <>
      <h1>Demandes</h1>
      <p className="adm__sub">{total} demande(s) — filtrez par type, lieu ou statut.</p>
      <form className="adm__filters" method="get">
        <select name="type" defaultValue={type}><option value="">Tous les types</option>{Object.entries(REQUEST_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <select name="campus" defaultValue={campus}><option value="">Tous les lieux</option>{CAMPUS_LIST.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
        <select name="status" defaultValue={status}><option value="">Tous les statuts</option>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <input name="q" defaultValue={q} placeholder="Nom, téléphone, email" />
        <button className="adm__btn">Filtrer</button>
        <a className="adm__btn adm__btn--ghost" href={`/api/admin/export/requests?${new URLSearchParams({ ...(type && { type }), ...(status && { status }) })}`}>Exporter CSV</a>
      </form>
      <div className="adm__scroll">
        <table>
          <thead><tr><th>Date</th><th>Type</th><th>Lieu</th><th>Personne</th><th>Contact</th><th>Responsable</th><th>Statut</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={7} className="adm__empty">Aucune demande.</td></tr>}
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{fmtDateTime(r.createdAt)}</td>
                <td><Link href={`/admin/requests/${r.id}`}>{REQUEST_TYPES[r.type] || r.type}</Link></td>
                <td>{CAMPUSES[r.campus]?.name || r.campus}</td>
                <td>{r.person?.name}</td>
                <td>{r.person?.phone}{r.person?.email ? <><br />{r.person.email}</> : null}</td>
                <td>{r.assignedTo?.name || '—'}</td>
                <td><span className={`badge badge--${r.status}`}>{STATUS[r.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="adm__bar" style={{ marginTop: '1rem' }}>
        {page > 1 && <Link className="adm__btn adm__btn--ghost adm__btn--sm" href={qs(page - 1)}>← Précédent</Link>}
        <span>Page {page} / {pages} · {total} résultat(s)</span>
        {page < pages && <Link className="adm__btn adm__btn--ghost adm__btn--sm" href={qs(page + 1)}>Suivant →</Link>}
      </p>
    </>
  );
}
