'use client';
import { useState } from 'react';

export default function CheckinForm() {
  const [v, setV] = useState({ code: '', nom: '', telephone: '' });
  const [state, setState] = useState({ status: 'idle', msg: '' });
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: k === 'code' ? e.target.value.replace(/\D/g, '').slice(0, 4) : e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setState({ status: 'sending', msg: '' });
    try {
      const res = await fetch('/api/checkin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Enregistrement impossible.');
      setState({ status: 'done', msg: data.already ? `Vous êtes déjà enregistré(e) pour « ${data.title} ».` : `Présence enregistrée pour « ${data.title} ». Bon culte !` });
    } catch (err) { setState({ status: 'error', msg: err.message }); }
  }

  if (state.status === 'done') return <div className="form form__ok" role="status"><h3>Merci !</h3><p>{state.msg}</p></div>;

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form__row"><label htmlFor="code">Code du culte *</label><input id="code" inputMode="numeric" autoComplete="one-time-code" value={v.code} onChange={set('code')} placeholder="0000" style={{ fontSize: '1.6rem', letterSpacing: '.4em', textAlign: 'center' }} /></div>
      <div className="form__row"><label htmlFor="nom">Nom complet *</label><input id="nom" value={v.nom} onChange={set('nom')} autoComplete="name" /></div>
      <div className="form__row"><label htmlFor="telephone">Téléphone / WhatsApp *</label><input id="telephone" type="tel" value={v.telephone} onChange={set('telephone')} autoComplete="tel" /></div>
      {state.status === 'error' && <p className="form__err" role="alert">{state.msg}</p>}
      <button className="btn btn-navy" style={{ width: '100%' }} disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Envoi…' : 'Je suis présent(e)'}</button>
    </form>
  );
}
