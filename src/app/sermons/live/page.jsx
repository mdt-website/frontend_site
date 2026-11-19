import { SITE, SERVICES } from '@/lib/site';
import SermonsNav from '../SermonsNav';

export const metadata = { title: 'En direct' };

export default function Page() {
  return (
    <>
      <SermonsNav current="live" />
      <section className="section"><div className="container center stack" style={{ maxWidth: 760 }}>
        <h2 className="h2">Regarder en <span className="accent">direct</span></h2>
        <p className="lead">Suivez nos cultes en direct sur notre chaîne YouTube, où que vous soyez.</p>
        {SERVICES.map((s) => <div className="card" key={s.day}><h3>{s.day}</h3><p>{s.label}</p><p><strong>{s.times.join('  ·  ')}</strong></p></div>)}
        <div className="btn-row center"><a className="btn btn-navy" href={SITE.youtube} target="_blank" rel="noopener noreferrer">Ouvrir YouTube</a></div>
      </div></section>
    </>
  );
}
