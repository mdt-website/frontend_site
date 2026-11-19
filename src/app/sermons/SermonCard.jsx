import Link from 'next/link';

export default function SermonCard({ s }) {
  return (
    <Link href={`/sermons/${s.slug}`} className="media-card">
      <div className="img" style={s.thumb ? { backgroundImage: `url(${s.thumb})` } : { background: 'var(--navy)' }} role="img" aria-label={s.title} />
      <h3>{s.title}</h3>
      <p>{s.speaker} · {s.date}</p>
      {s.series && <p style={{ color: 'var(--gold-text)', fontWeight: 600, fontSize: '.8em' }}>{s.series}</p>}
    </Link>
  );
}
