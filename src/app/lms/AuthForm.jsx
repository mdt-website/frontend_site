'use client';
import { useActionState } from 'react';
import { studentLogin, studentSignup } from './actions';

export default function AuthForm({ mode }) {
  const signup = mode === 'signup';
  const [state, action, pending] = useActionState(signup ? studentSignup : studentLogin, null);
  return (
    <form action={action} className="form">
      {state?.error && <p className="form__err" role="alert">{state.error}</p>}
      {signup && <div className="form__row"><label htmlFor="name">Nom complet</label><input id="name" name="name" autoComplete="name" required /></div>}
      <div className="form__row"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="form__row"><label htmlFor="password">Mot de passe</label><input id="password" name="password" type="password" autoComplete={signup ? 'new-password' : 'current-password'} minLength={signup ? 8 : undefined} required /></div>
      {signup && <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />}
      <button className="btn btn-navy" disabled={pending}>{pending ? 'Patientez…' : signup ? 'Créer mon compte' : 'Se connecter'}</button>
    </form>
  );
}
