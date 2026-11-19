'use client';
import { useActionState } from 'react';
import { changePassword } from '../../actions';

export default function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, null);
  return (
    <form action={action} className="adm__panel adm__form">
      {state?.error && <p className="adm__msg adm__msg--err" role="alert">{state.error}</p>}
      {state?.ok && <p className="adm__msg" role="status">{state.ok}</p>}
      <div><label htmlFor="current">Mot de passe actuel</label><input id="current" name="current" type="password" autoComplete="current-password" required /></div>
      <div><label htmlFor="next">Nouveau mot de passe (10 caractères min.)</label><input id="next" name="next" type="password" minLength={10} autoComplete="new-password" required /></div>
      <div><button className="adm__btn" disabled={pending}>{pending ? 'Enregistrement…' : 'Mettre à jour'}</button></div>
    </form>
  );
}
