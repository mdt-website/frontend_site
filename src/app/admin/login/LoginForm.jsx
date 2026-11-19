'use client';
import { useActionState } from 'react';
import { login } from '../actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action}>
      <img src="/img/logo.png" alt="MDT" style={{ height: 48, width: 'auto', background: '#0b1633', padding: 8, borderRadius: 8, justifySelf: 'start' }} />
      <h1>Back-office</h1>
      {state?.error && <p className="adm__msg adm__msg--err" role="alert">{state.error}</p>}
      <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="username" required /></div>
      <div><label htmlFor="password">Mot de passe</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>
      <button className="adm__btn" disabled={pending}>{pending ? 'Connexion…' : 'Se connecter'}</button>
    </form>
  );
}
