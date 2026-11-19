import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { can, ROLES } from '@/lib/crm';
import { logout } from '../actions';
import '../admin.css';

export const metadata = { title: 'Back-office', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }) {
  const user = await requireUser();
  return (
    <div className="adm">
      <aside className="adm__side">
        <div className="adm__brand"><img src="/img/logo.png" alt="" /> Back-office</div>
        <nav className="adm__nav" aria-label="Back-office">
          <Link href="/admin">Tableau de bord</Link>
          <h6>CRM</h6>
          <Link href="/admin/requests">Demandes</Link>
          <Link href="/admin/people">Personnes</Link>
          {can.seeDonations(user) && <Link href="/admin/donations">Dons</Link>}
          <Link href="/admin/subscribers">Abonnés</Link>
          <h6>Église</h6>
          <Link href="/admin/services">Cultes et présence</Link>
          {can.manageContent(user) && <Link href="/admin/sermons">Sermons</Link>}
          {can.manageContent(user) && <Link href="/admin/events">Événements</Link>}
          {can.manageContent(user) && <Link href="/admin/courses">Formation</Link>}
          {can.manageContent(user) && <Link href="/admin/certificates">Certificats</Link>}
          <h6>Compte</h6>
          {can.manageUsers(user) && <Link href="/admin/users">Utilisateurs</Link>}
          <Link href="/admin/account">Mon compte</Link>
          <Link href="/" target="_blank">Voir le site</Link>
        </nav>
        <div className="adm__user">
          <strong>{user.name}</strong>{ROLES[user.role]}
          <form action={logout} style={{ marginTop: '.6rem' }}><button className="adm__btn adm__btn--ghost adm__btn--sm">Déconnexion</button></form>
        </div>
      </aside>
      <main className="adm__main">{children}</main>
    </div>
  );
}
