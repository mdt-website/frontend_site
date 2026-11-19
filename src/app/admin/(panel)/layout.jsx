import { requireUser } from '@/lib/auth';
import { can, ROLES } from '@/lib/crm';
import { logout } from '../actions';
import AdminNav from './AdminNav';
import '../admin.css';

export const metadata = { title: { default: 'Back-office', template: '%s · Back-office' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }) {
  const user = await requireUser();
  const content = can.manageContent(user);
  const groups = [
    { items: [{ href: '/admin', label: 'Tableau de bord', icon: 'home' }] },
    { title: 'CRM', items: [
      { href: '/admin/requests', label: 'Demandes', icon: 'inbox' },
      { href: '/admin/people', label: 'Personnes', icon: 'users' },
      ...(can.seeDonations(user) ? [{ href: '/admin/donations', label: 'Dons', icon: 'gift' }] : []),
      { href: '/admin/subscribers', label: 'Abonnés', icon: 'mail' },
    ] },
    { title: 'Église', items: [
      { href: '/admin/services', label: 'Cultes et présence', icon: 'check' },
      ...(content ? [
        { href: '/admin/sermons', label: 'Sermons', icon: 'mic' },
        { href: '/admin/events', label: 'Événements', icon: 'cal' },
        { href: '/admin/courses', label: 'Formation', icon: 'book' },
        { href: '/admin/certificates', label: 'Certificats', icon: 'award' },
      ] : []),
    ] },
    { title: 'Administration', items: [
      ...(can.manageUsers(user) ? [{ href: '/admin/users', label: 'Utilisateurs', icon: 'shield' }] : []),
      { href: '/admin/account', label: 'Mon compte', icon: 'user' },
      { href: '/', label: 'Voir le site', icon: 'globe', external: true },
    ] },
  ];
  const initials = String(user.name || '?').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className="adm">
      <aside className="adm__side">
        <div className="adm__brand"><img src="/img/logo.png" alt="" /><span>Maison de la<br />Transformation</span></div>
        <AdminNav groups={groups} />
        <div className="adm__user">
          <span className="adm__avatar" aria-hidden="true">{initials}</span>
          <div><strong>{user.name}</strong><small>{ROLES[user.role]}</small></div>
          <form action={logout}><button className="adm__out" title="Se déconnecter" aria-label="Se déconnecter">⏻</button></form>
        </div>
      </aside>
      <main className="adm__main">{children}</main>
    </div>
  );
}
