'use client';
import { useEffect, useState } from 'react';

function nextSunday8() {
  const now = new Date();
  const t = new Date(now);
  t.setDate(now.getDate() + ((7 - now.getDay()) % 7));
  t.setHours(8, 0, 0, 0);
  if (t <= now) t.setDate(t.getDate() + 7);
  return t;
}
const pad = (n) => String(n).padStart(2, '0');

export default function Countdown() {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const target = nextSunday8();
    const tick = () => setLeft(Math.max(0, target - new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const d = left === null ? null : Math.floor(left / 86400000);
  const h = left === null ? null : Math.floor(left / 3600000) % 24;
  const m = left === null ? null : Math.floor(left / 60000) % 60;
  const s = left === null ? null : Math.floor(left / 1000) % 60;
  return (
    <div className="countdown" aria-live="off">
      <span>DIMANCHE · 08h00 &amp; 17h00 · MDT Calavi</span>
      <span>Prochain culte dans <strong>{left === null ? '--' : `${d}j ${pad(h)}:${pad(m)}:${pad(s)}`}</strong></span>
    </div>
  );
}
