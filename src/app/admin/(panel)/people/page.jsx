import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { fmtDate } from '@/lib/format';

const PAGE = 30;

export default async function People({ searchParams }) {
  await requireUser();
  const sp = await searchParams;
  const q = String(sp.q || '').trim().slice(0, 80);
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1);
  const where = q ? { OR: [{ name: { contains: q } }, { phone: { contains: q } }, { email: { contains: q } }, { quarter: { contains: q } }] } : {};
  const [rows, total] = await Promise.all([
    db.person.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * PAGE, take: PAGE, include: { _count: { select: { requests: true, attendance: true } } } }),
    db.person.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE));
  const qs = (p) => `?${new URLSearchParams({ ...(q && { q }), page: String(p) })}`;
  return (
    <>
      <h1>Personnes</h1>
      <form className="adm__filters" method="get">
        <input name="q" defaultValue={q} placeholder="Nom, téléphone, email, quartier" />
        <button className="adm__btn">Rechercher</button>
        <a className="adm__btn adm__btn--ghost" href="/api/admin/export/people">Exporter CSV</a>
      </form>
      <div className="adm__scroll">
        <table>
          <thead><tr><th>Nom</th><th>Téléphone</th><th>Email</th><th>Quartier</th><th>Demandes</th><th>Présences</th><th>Depuis</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={7}>Aucune personne.</td></tr>}
            {rows.map((p) => (
              <tr key={p.id}>
                <td><Link href={`/admin/people/${p.id}`}>{p.name}</Link></td><td>{p.phone}</td><td>{p.email}</td><td>{p.quarter}</td>
                <td>{p._count.requests}</td><td>{p._count.attendance}</td><td>{fmtDate(p.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="adm__bar" style={{ marginTop: '1rem' }}>
        {page > 1 && <Link className="adm__btn adm__btn--ghost adm__btn--sm" href={qs(page - 1)}>← Précédent</Link>}
        <span>Page {page} / {pages} · {total} personne(s)</span>
        {page < pages && <Link className="adm__btn adm__btn--ghost adm__btn--sm" href={qs(page + 1)}>Suivant →</Link>}
      </p>
    </>
  );
}
