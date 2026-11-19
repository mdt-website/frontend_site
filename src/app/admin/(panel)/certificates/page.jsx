import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { mailEnabled } from '@/lib/mail';
import { fmtDate } from '@/lib/format';
import CertForm from './CertForm';

export default async function Certificates() {
  await requireUser(can.manageContent);
  const [done, issued] = await Promise.all([
    db.enrollment.findMany({ where: { completedAt: { not: null } }, include: { student: true, course: true }, orderBy: { completedAt: 'desc' }, take: 100 }),
    db.certificate.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
  ]);
  const have = new Set(issued.map((c) => `${c.email}|${c.title}`));
  const eligible = done.filter((e) => !have.has(`${e.student.email}|${e.course.title}`)).map((e) => ({ id: e.id, name: e.student.name, email: e.student.email, course: e.course.title }));
  return (
    <>
      <h1>Certificats</h1>
      <CertForm eligible={eligible} today={new Date().toISOString().slice(0, 10)} mailOn={mailEnabled()} />
      <h2>Derniers certificats émis</h2>
      <div className="adm__scroll"><table>
        <thead><tr><th>Date</th><th>Nom</th><th>Formation</th><th>Code</th><th>Email</th></tr></thead>
        <tbody>
          {issued.length === 0 && <tr><td colSpan={5}>Aucun certificat.</td></tr>}
          {issued.map((c) => <tr key={c.id}><td>{fmtDate(c.issuedOn)}</td><td>{c.name}</td><td>{c.title}</td><td><a href={`/certificat/${c.code}`} target="_blank" rel="noopener noreferrer">{c.code}</a></td><td>{c.sentAt ? 'Envoyé' : '—'}</td></tr>)}
        </tbody>
      </table></div>
    </>
  );
}
