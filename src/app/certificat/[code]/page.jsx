import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { fmtDate } from '@/lib/format';
import { SITE } from '@/lib/site';
import PrintButton from './PrintButton';

export const metadata = { title: 'Certificat', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

// Page publique de vérification : chaque certificat est identifié par un code non devinable.
export default async function CertificatePage({ params }) {
  const { code } = await params;
  const c = /^[A-Z2-9]{10}$/.test(code) ? await db.certificate.findUnique({ where: { code } }) : null;
  if (!c) notFound();
  return (
    <section className="section"><div className="container" style={{ maxWidth: 900 }}>
      <div style={{ border: '10px double #B29A4F', background: '#fffdf6', padding: 'clamp(1.5rem, 4vw, 3.5rem)', textAlign: 'center', borderRadius: 6 }}>
        <img src="/img/logo.png" alt="" style={{ height: 64, width: 'auto', background: '#0b1633', padding: 10, borderRadius: 8 }} />
        <p style={{ letterSpacing: '.3em', textTransform: 'uppercase', color: '#B29A4F', fontWeight: 700, marginTop: '1.5rem' }}>Certificat</p>
        <p>{SITE.name} certifie que</p>
        <h1 className="h1" style={{ color: 'var(--navy)', margin: '.5rem 0' }}>{c.name}</h1>
        <p>a accompli avec succès la formation</p>
        <h2 className="h2">{c.title}</h2>
        <p>Remis le {fmtDate(c.issuedOn)}{c.sender ? ` · ${c.sender}` : ''}</p>
        <p><small>Code de vérification : <strong>{c.code}</strong></small></p>
      </div>
      <PrintButton />
    </div></section>
  );
}
