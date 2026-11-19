'use client';
import { useState } from 'react';

const TAGS = ['Tous', 'Grâce', 'Foi', 'Prière', 'Guérison', 'Famille', 'Transformation'];

export default function SermonList({ sermons, channel }) {
  const [tag, setTag] = useState('Tous');
  const list = sermons.filter((s) => tag === 'Tous' || s.tags.includes(tag));
  return (
    <div className="container">
      <div className="btn-row center" role="group" aria-label="Thèmes">
        {TAGS.map((t) => <button key={t} className={`filter ${t === tag ? 'on' : ''}`} onClick={() => setTag(t)}>{t}</button>)}
      </div>
      {list.length === 0 ? (
        <div className="center stack mt">
          <p className="lead">Les derniers enseignements sont disponibles sur notre chaîne YouTube.</p>
          <a className="btn btn-navy" href={channel} target="_blank" rel="noopener noreferrer">Regarder sur YouTube</a>
        </div>
      ) : (
        <div className="grid g3 mt">{list.map((s) => <a key={s.id} className="card" href={s.url} target="_blank" rel="noopener noreferrer"><h3>{s.title}</h3><p>{s.speaker} · {s.date}</p></a>)}</div>
      )}
    </div>
  );
}
