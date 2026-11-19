'use client';
import { useMemo, useState } from 'react';

export default function SermonList({ sermons, channel }) {
  const tags = useMemo(() => ['Tous', ...new Set(sermons.flatMap((s) => s.tags))], [sermons]);
  const [tag, setTag] = useState('Tous');
  const list = sermons.filter((s) => tag === 'Tous' || s.tags.includes(tag));
  return (
    <div className="container">
      {tags.length > 1 && (
        <div className="btn-row center" role="group" aria-label="Thèmes">
          {tags.map((t) => <button key={t} className={`filter ${t === tag ? 'on' : ''}`} onClick={() => setTag(t)}>{t}</button>)}
        </div>
      )}
      {list.length === 0 ? (
        <div className="center stack mt">
          <p className="lead">Les derniers enseignements sont disponibles sur notre chaîne YouTube.</p>
          <a className="btn btn-navy" href={channel} target="_blank" rel="noopener noreferrer">Regarder sur YouTube</a>
        </div>
      ) : (
        <div className="grid g3 mt">
          {list.map((s) => (
            <a key={s.id} className="card" href={s.url} target="_blank" rel="noopener noreferrer">
              <h3>{s.title}</h3><p>{s.speaker} · {s.date}</p>
              {s.tags.length > 0 && <p style={{ marginTop: '.6rem', color: 'var(--gold-text)', fontWeight: 600, fontSize: '.8em' }}>{s.tags.join(' · ')}</p>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
