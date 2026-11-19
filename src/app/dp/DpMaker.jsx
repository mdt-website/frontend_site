'use client';
import { useEffect, useRef, useState } from 'react';

const SIZE = 1080;

// Tout se passe dans le navigateur : la photo n'est jamais envoyée au serveur.
export default function DpMaker({ campaigns }) {
  const canvas = useRef(null);
  const [campaign, setCampaign] = useState(campaigns[0]?.id);
  const [name, setName] = useState('');
  const [shape, setShape] = useState('circle');
  const [photo, setPhoto] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => { const i = new Image(); i.onload = () => setLogo(i); i.src = '/img/logo.png'; }, []);

  useEffect(() => {
    const c = canvas.current; if (!c) return;
    const g = c.getContext('2d');
    const grad = g.createLinearGradient(0, 0, SIZE, SIZE);
    grad.addColorStop(0, '#253F7C'); grad.addColorStop(1, '#0b1633');
    g.fillStyle = grad; g.fillRect(0, 0, SIZE, SIZE);
    g.strokeStyle = '#E7CF84'; g.lineWidth = 10; g.strokeRect(36, 36, SIZE - 72, SIZE - 72);
    if (logo) { const h = 90, w = (logo.width / logo.height) * h; g.drawImage(logo, (SIZE - w) / 2, 80, w, h); }

    const cx = SIZE / 2, cy = 500, r = 230;
    g.save();
    g.beginPath();
    if (shape === 'circle') g.arc(cx, cy, r, 0, Math.PI * 2); else g.rect(cx - r, cy - r, r * 2, r * 2);
    g.closePath(); g.clip();
    g.fillStyle = '#16264d'; g.fillRect(cx - r, cy - r, r * 2, r * 2);
    if (photo) { const s = Math.max((r * 2) / photo.width, (r * 2) / photo.height); const w = photo.width * s, h = photo.height * s; g.drawImage(photo, cx - w / 2, cy - h / 2, w, h); }
    g.restore();
    g.strokeStyle = '#E7CF84'; g.lineWidth = 10; g.beginPath();
    if (shape === 'circle') g.arc(cx, cy, r + 8, 0, Math.PI * 2); else g.rect(cx - r - 8, cy - r - 8, r * 2 + 16, r * 2 + 16);
    g.stroke();

    g.textAlign = 'center'; g.fillStyle = '#fff';
    g.font = '800 64px system-ui, sans-serif'; g.fillText(name.trim().slice(0, 28) || 'Votre nom', cx, 830);
    g.fillStyle = '#E7CF84'; g.font = '600 40px system-ui, sans-serif';
    const title = campaigns.find((x) => x.id === campaign)?.title || '';
    wrap(g, title, cx, 900, SIZE - 220, 50);
  }, [campaign, name, shape, photo, logo, campaigns]);

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith('image/') || f.size > 12 * 1024 * 1024) return;
    const url = URL.createObjectURL(f);
    const i = new Image(); i.onload = () => { setPhoto(i); URL.revokeObjectURL(url); }; i.src = url;
  }

  function download() {
    canvas.current.toBlob((b) => {
      const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'mon-visuel-mdt.png'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  }

  return (
    <div className="split" style={{ alignItems: 'start' }}>
      <div className="form" style={{ margin: 0 }}>
        <div className="form__row"><label htmlFor="dp-event">Événement</label><select id="dp-event" value={campaign} onChange={(e) => setCampaign(e.target.value)}>{campaigns.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}</select></div>
        <div className="form__row"><label htmlFor="dp-photo">Votre photo</label><input id="dp-photo" type="file" accept="image/*" onChange={onFile} /></div>
        <div className="form__row"><label htmlFor="dp-name">Votre nom</label><input id="dp-name" value={name} maxLength={28} onChange={(e) => setName(e.target.value)} /></div>
        <div className="form__row"><label htmlFor="dp-shape">Forme de la photo</label><select id="dp-shape" value={shape} onChange={(e) => setShape(e.target.value)}><option value="circle">Cercle</option><option value="square">Carré</option></select></div>
        <button className="btn btn-navy" onClick={download} type="button">Télécharger mon visuel</button>
      </div>
      <canvas ref={canvas} width={SIZE} height={SIZE} role="img" aria-label="Aperçu du visuel" style={{ width: '100%', height: 'auto', borderRadius: 14, boxShadow: '0 14px 40px rgba(37,63,124,.2)' }} />
    </div>
  );
}

function wrap(g, text, x, y, maxW, lh) {
  const words = text.split(' '); let line = ''; let yy = y;
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (g.measureText(t).width > maxW && line) { g.fillText(line, x, yy); line = w; yy += lh; } else line = t;
  }
  g.fillText(line, x, yy);
}
