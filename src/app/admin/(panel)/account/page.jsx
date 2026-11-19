import { requireUser } from '@/lib/auth';
import { ROLES } from '@/lib/crm';
import PasswordForm from './PasswordForm';

export default async function Account() {
  const user = await requireUser();
  return (
    <>
      <h1>Mon compte</h1>
      <div className="adm__panel"><dl><dt>Nom</dt><dd>{user.name}</dd><dt>Email</dt><dd>{user.email}</dd><dt>Rôle</dt><dd>{ROLES[user.role]}</dd></dl></div>
      <h2>Changer mon mot de passe</h2>
      <PasswordForm />
    </>
  );
}
