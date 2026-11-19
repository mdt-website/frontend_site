import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can, ROLES } from '@/lib/crm';
import { fmtDateTime } from '@/lib/format';
import { setUserActive } from '../../actions';
import UserForm from './UserForm';

export default async function Users() {
  const me = await requireUser(can.manageUsers);
  const rows = await db.user.findMany({ orderBy: { createdAt: 'asc' } });
  return (
    <>
      <h1>Utilisateurs</h1>
      <div className="adm__scroll"><table>
        <thead><tr><th>Nom</th><th>Email</th><th>Rôle</th><th>Dernière connexion</th><th>État</th><th /></tr></thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{ROLES[u.role]}</td><td>{u.lastLoginAt ? fmtDateTime(u.lastLoginAt) : 'Jamais'}</td>
              <td><span className={`badge ${u.active ? 'badge--DONE' : 'badge--ARCHIVED'}`}>{u.active ? 'Actif' : 'Désactivé'}</span></td>
              <td>{u.id !== me.id && <form action={setUserActive}><input type="hidden" name="id" value={u.id} /><button className="adm__btn adm__btn--ghost adm__btn--sm">{u.active ? 'Désactiver' : 'Réactiver'}</button></form>}</td></tr>
          ))}
        </tbody>
      </table></div>
      <h2>Ajouter un utilisateur</h2>
      <UserForm />
    </>
  );
}
