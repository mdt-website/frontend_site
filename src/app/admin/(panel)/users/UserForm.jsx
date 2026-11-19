'use client';
import { useActionState } from 'react';
import { createUser } from '../../actions';

export default function UserForm() {
  const [state, action, pending] = useActionState(createUser, null);
  return (
    <form action={action} className="adm__panel adm__form">
      {state?.error && <p className="adm__msg adm__msg--err" role="alert">{state.error}</p>}
      {state?.ok && <p className="adm__msg" role="status">{state.ok}</p>}
      <div className="adm__row2">
        <div><label htmlFor="name">Nom *</label><input id="name" name="name" required /></div>
        <div><label htmlFor="email">Email *</label><input id="email" name="email" type="email" required /></div>
      </div>
      <div className="adm__row2">
        <div><label htmlFor="role">Rôle</label><select id="role" name="role" defaultValue="LEADER"><option value="LEADER">Responsable (suivi des demandes)</option><option value="PASTOR">Pasteur (CRM, dons, contenus)</option><option value="ADMIN">Administrateur (tout)</option></select></div>
        <div><label htmlFor="password">Mot de passe (10 caractères min.) *</label><input id="password" name="password" type="password" minLength={10} autoComplete="new-password" required /></div>
      </div>
      <div><button className="adm__btn" disabled={pending}>{pending ? 'Création…' : 'Créer'}</button></div>
    </form>
  );
}
