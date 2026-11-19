'use client';
import { useState } from 'react';

// fields: [{ name, label, type: text|email|tel|textarea|select|checkbox|date, required, options }]
export default function RequestForm({ type, fields, submitLabel = 'Envoyer', successMessage, inline = false, extra }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');
  const [hp, setHp] = useState(''); // champ piège anti-spam
  const set = (n, v) => setValues((s) => ({ ...s, [n]: v }));

  const validate = () => {
    const e = {};
    fields.forEach((f) => {
      const v = values[f.name];
      if (f.required && (!v || (typeof v === 'string' && !v.trim()))) e[f.name] = 'Ce champ est requis';
      else if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.name] = 'Email invalide';
      else if (f.type === 'tel' && v && !/^[+\d][\d\s().-]{6,}$/.test(v)) e[f.name] = 'Numéro invalide';
    });
    setErrors(e);
    return !Object.keys(e).length;
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, ...values, ...extra, website: hp }) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Envoi impossible, veuillez réessayer.');
      setStatus('done');
    } catch (err) { setServerError(err.message); setStatus('error'); }
  }

  if (status === 'done') {
    return <div className={inline ? 'mail' : 'form form__ok'} role="status" style={inline ? { color: '#fff' } : undefined}><h3>Merci !</h3><p>{successMessage || 'Votre demande a bien été reçue. Nous vous répondrons très bientôt.'}</p></div>;
  }

  if (inline) {
    const f = fields[0];
    return (
      <form className="mail" onSubmit={onSubmit} noValidate>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }} />
        <input type={f.type} placeholder={f.label} aria-label={f.label} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />
        <button className="btn" disabled={status === 'sending'}>{submitLabel}</button>
        {(errors[f.name] || status === 'error') && <span className="err">{errors[f.name] || serverError}</span>}
      </form>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }} />
      {fields.map((f) => (
        <div className={`form__row ${f.type === 'checkbox' ? 'form__check' : ''}`} key={f.name}>
          {f.type === 'checkbox' ? (
            <><input id={f.name} type="checkbox" checked={!!values[f.name]} onChange={(e) => set(f.name, e.target.checked)} /><label htmlFor={f.name}>{f.label}{f.required && ' *'}</label></>
          ) : (
            <>
              <label htmlFor={f.name}>{f.label}{f.required && ' *'}</label>
              {f.type === 'textarea' ? <textarea id={f.name} rows={5} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />
                : f.type === 'select' ? <select id={f.name} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)}><option value="">Choisir…</option>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                : <input id={f.name} type={f.type || 'text'} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />}
            </>
          )}
          {errors[f.name] && <span className="form__err">{errors[f.name]}</span>}
        </div>
      ))}
      {status === 'error' && <p className="form__err">{serverError}</p>}
      <button className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>{status === 'sending' ? 'Envoi…' : submitLabel}</button>
    </form>
  );
}
