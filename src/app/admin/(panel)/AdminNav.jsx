'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const P = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  inbox: 'M3 13l3-8h12l3 8M3 13v6h18v-6M3 13h5l1 3h6l1-3h5',
  users: 'M16 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M9.5 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7M21 20v-2a4 4 0 00-3-3.9M16 3.1a3.5 3.5 0 010 6.8',
  gift: 'M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H8a2.5 2.5 0 110-5c2 0 4 5 4 5zM12 7h4a2.5 2.5 0 100-5c-2 0-4 5-4 5z',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  check: 'M9 11l3 3 8-8M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h9',
  mic: 'M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zM5 11a7 7 0 0014 0M12 18v3',
  cal: 'M4 5h16v16H4zM4 10h16M8 3v4M16 3v4',
  book: 'M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4zM20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7z',
  award: 'M12 14a6 6 0 100-12 6 6 0 000 12zM8.5 13L7 22l5-3 5 3-1.5-9',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  user: 'M20 21a8 8 0 10-16 0M12 12a4 4 0 100-8 4 4 0 000 8',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18',
};
const Icon = ({ n }) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n]} /></svg>;

export default function AdminNav({ groups }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const on = (h) => (h === '/admin' ? path === '/admin' : path === h || path.startsWith(`${h}/`));
  return (
    <>
      <button className="adm__burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((o) => !o)}>☰</button>
      <nav className={`adm__nav${open ? ' is-open' : ''}`} aria-label="Back-office" onClick={() => setOpen(false)}>
        {groups.map((g) => (
          <div key={g.title || 'main'}>
            {g.title && <h6>{g.title}</h6>}
            {g.items.map((i) => (
              <Link key={i.href} href={i.href} target={i.external ? '_blank' : undefined} className={on(i.href) ? 'is-active' : ''} aria-current={on(i.href) ? 'page' : undefined}>
                <Icon n={i.icon} /> {i.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </>
  );
}
