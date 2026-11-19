'use client';
import { useState } from 'react';

// Équivalent de l'explorateur de campus de joincci.org : filtre par pays, liste des lieux, fiche du lieu choisi.
export default function CampusExplorer({ campuses }) {
  const countries = [...new Set(campuses.map((c) => c.country))];
  const [country, setCountry] = useState(null);
  const list = country ? campuses.filter((c) => c.country === country) : campuses;
  const [slug, setSlug] = useState(campuses[0].slug);
  const current = list.find((c) => c.slug === slug) || list[0];
  const q = encodeURIComponent(current.address || current.mapQuery);

  return (
    <div className="container">
      <div className="center stack" style={{ marginBottom: '2rem' }}>
        <h2 className="h2">Visiter la <span className="accent">MDT</span></h2>
        <div className="btn-row center" role="group" aria-label="Filtrer par pays">
          <button type="button" className={`filter ${country === null ? 'on' : ''}`} aria-pressed={country === null} onClick={() => setCountry(null)}>Tous ({campuses.length})</button>
          {countries.map((c) => <button type="button" key={c} className={`filter ${country === c ? 'on' : ''}`} aria-pressed={country === c} onClick={() => { setCountry(c); setSlug(campuses.find((x) => x.country === c).slug); }}>{c} ({campuses.filter((x) => x.country === c).length})</button>)}
        </div>
      </div>
      <div className="split" style={{ alignItems: 'start' }}>
        <div className="stack">
          <div className="stack" role="tablist" aria-label="Lieux">
            {list.map((c) => (
              <button type="button" role="tab" aria-selected={c.slug === current.slug} key={c.slug} className={`row-card ${c.slug === current.slug ? 'row-card--on' : ''}`} style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => setSlug(c.slug)}>
                <strong>{c.name}</strong><span>{c.city}, {c.country}</span>
              </button>
            ))}
          </div>
          <div className="card">
            <h3>{current.name}</h3>
            <p>{current.address || 'Adresse bientôt disponible. Contactez-nous pour être guidé.'}</p>
            <h4 style={{ marginTop: '1rem' }}>Horaires des cultes</h4>
            {current.services.length
              ? current.services.map((s) => <p key={s.day}><strong>{s.day}</strong> : {s.times.join(' · ')}</p>)
              : <p>Bientôt disponibles.</p>}
            <div className="btn-row">
              <a className="btn btn-navy" href={current.site}>Site du lieu</a>
              <a className="btn btn-outline" style={{ color: 'var(--navy)' }} href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">Ouvrir dans Maps</a>
            </div>
          </div>
        </div>
        <iframe key={current.slug} title={`Carte ${current.name}`} loading="lazy" style={{ border: 0, width: '100%', aspectRatio: '4 / 5', borderRadius: 14 }} src={`https://www.google.com/maps?q=${q}&output=embed`} />
      </div>
    </div>
  );
}
