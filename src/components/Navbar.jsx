'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={`nav ${solid || open ? 'nav--solid' : ''}`}>
      <div className="container nav__inner">
        <Link href="/" className="nav__logo" aria-label="Accueil MDT">
          <img src="/img/logo.png" alt="La Maison de la Transformation" />
        </Link>
        <nav className={`nav__links ${open ? 'open' : ''}`} aria-label="Navigation principale">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className={path === l.href ? 'active' : ''}>{l.label}</Link>
          ))}
        </nav>
        <button className="nav__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span className="bars" /></button>
      </div>
    </header>
  );
}
