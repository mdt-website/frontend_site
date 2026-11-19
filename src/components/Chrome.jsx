'use client';
import { usePathname } from 'next/navigation';

// Le back-office a sa propre interface : on y masque l'en-tête et le pied de page publics.
export default function Chrome({ nav, footer, children }) {
  const bare = (usePathname() || '').startsWith('/admin');
  return (
    <>
      {!bare && nav}
      <main id="contenu">{children}</main>
      {!bare && footer}
    </>
  );
}
