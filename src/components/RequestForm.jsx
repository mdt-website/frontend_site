'use client';
import { useMemo, useState } from 'react';
import { FORMS, isShown } from '@/lib/forms';
import { DIAL_CODES, countryNames } from '@/lib/countries';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,}$/;
const SPAN = { full: 'form__c6', half: 'form__c3', third: 'form__c2' };

// `form` : clé de FORMS (formulaire calqué sur CCI).  `fields` : ancien format, pour les formulaires simples.
export default function RequestForm({ type, form, fields: legacy, submitLabel = 'Envoyer', successMessage, inline = false, extra }) {
  const fields = useMemo(() => (form ? FORMS[form].fields : legacy), [form, legacy]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');
  const [hp, setHp] = useState(''); // champ piège anti-spam
  const set = (n, v) => setValues((s) => ({ ...s, [n]: v }));
  const setName = (n, part, v) => setValues((s) => {
    const next = { ...s, [`${n}__${part}`]: v };
    next[n] = [next[`${n}__p`], next[`${n}__n`]].map((x) => (x || '').trim()).filter(Boolean).join(' ');
    return next;
  });
  const setTel = (n, part, v) => setValues((s) => {
    const next = { ...s, [`${n}__${part}`]: v };
    const local = (next[`${n}__l`] || '').trim();
    next[n] = local ? `${next[`${n}__c`] || DIAL_CODES[0][1]} ${local}` : '';
    return next;
  });
  const toggle = (n, o) => setValues((s) => { const cur = new Set(s[n] || []); cur.has(o) ? cur.delete(o) : cur.add(o); return { ...s, [n]: [...cur] }; });

  const validate = () => {
    const e = {};
    fields.forEach((f) => {
      if (f.type === 'section' || !isShown(f, values)) return;
      const v = values[f.name];
      const empty = v == null || v === '' || v === false || (Array.isArray(v) && !v.length) || (typeof v === 'string' && !v.trim());
      if (f.type === 'name' && f.required && (!(values[`${f.name}__p`] || '').trim() || !(values[`${f.name}__n`] || '').trim())) e[f.name] = 'Prénom et nom requis';
      else if (f.required && empty) e[f.name] = 'Ce champ est requis';
      else if (f.type === 'email' && v && !EMAIL_RE.test(v)) e[f.name] = 'Email invalide';
      else if (f.type === 'tel' && (values[`${f.name}__l`] || '').trim() && !PHONE_RE.test(values[`${f.name}__l`])) e[f.name] = 'Numéro invalide';
      else if (f.type === 'url' && v && !/^https?:\/\/\S+$/i.test(v)) e[f.name] = 'Lien invalide (commencez par https://)';
      else if (f.type === 'number' && v && !/^\d{1,6}$/.test(v)) e[f.name] = 'Nombre invalide';
    });
    setErrors(e);
    return !Object.keys(e).length;
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    const body = {};
    fields.forEach((f) => { if (f.type !== 'section' && isShown(f, values) && values[f.name] != null) body[f.name] = values[f.name]; });
    try {
      const res = await fetch('/api/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, ...body, ...extra, website: hp }) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Envoi impossible, veuillez réessayer.');
      setStatus('done');
    } catch (err) { setServerError(err.message); setStatus('error'); }
  }

  const trap = <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />;

  if (status === 'done') {
    return <div className={inline ? 'mail' : 'form form__ok'} role="status" style={inline ? { color: '#fff' } : undefined}><h3>Merci !</h3><p>{successMessage || 'Votre demande a bien été reçue. Nous reviendrons vers vous très bientôt.'}</p></div>;
  }

  if (inline) {
    const f = fields[0];
    return (
      <form className="mail" onSubmit={onSubmit} noValidate>
        {trap}
        <input type={f.type} placeholder={f.label} aria-label={f.label} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />
        <button className="btn" disabled={status === 'sending'}>{submitLabel}</button>
        {(errors[f.name] || status === 'error') && <span className="err">{errors[f.name] || serverError}</span>}
      </form>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {trap}
      <div className="form__grid">
        {fields.filter((f) => isShown(f, values)).map((f) => {
          const id = `f-${f.name}`;
          const req = f.required ? ' *' : '';
          const err = errors[f.name] && <span className="form__err">{errors[f.name]}</span>;
          const cls = `form__row ${SPAN[f.width] || SPAN.full}`;
          if (f.type === 'consent' || f.type === 'checkbox') {
            return <div className={`${cls} form__check`} key={f.name}><input id={id} type="checkbox" checked={!!values[f.name]} onChange={(e) => set(f.name, e.target.checked)} /><label htmlFor={id}>{f.label}{req}</label>{err}</div>;
          }
          if (f.type === 'name') {
            return (
              <div className={cls} key={f.name}>
                <label htmlFor={id}>{f.label}{req}</label>
                <div className="form__pair">
                  <input id={id} autoComplete="given-name" aria-label={`${f.label} : prénom`} placeholder="Prénom" value={values[`${f.name}__p`] || ''} onChange={(e) => setName(f.name, 'p', e.target.value)} />
                  <input aria-label={`${f.label} : nom`} autoComplete="family-name" placeholder="Nom" value={values[`${f.name}__n`] || ''} onChange={(e) => setName(f.name, 'n', e.target.value)} />
                </div>
                {err}
              </div>
            );
          }
          if (f.type === 'section') {
            return <h3 className="form__c6 form__section" key={f.name}>{f.label}</h3>;
          }
          if (f.type === 'tel') {
            return (
              <div className={cls} key={f.name}>
                <label htmlFor={id}>{f.label}{req}</label>
                <div className="form__tel">
                  <select aria-label="Indicatif du pays" value={values[`${f.name}__c`] || DIAL_CODES[0][1]} onChange={(e) => setTel(f.name, 'c', e.target.value)}>{DIAL_CODES.map(([n, c]) => <option key={n} value={c}>{n} {c}</option>)}</select>
                  <input id={id} type="tel" autoComplete="tel-national" placeholder={f.placeholder?.replace(/^\+\d+\s*/, '') || '01 41 37 37 41'} value={values[`${f.name}__l`] || ''} onChange={(e) => setTel(f.name, 'l', e.target.value)} />
                </div>
                {err}
              </div>
            );
          }
          if (f.type === 'rating') {
            return (
              <fieldset className={`${cls} form__choices`} key={f.name}>
                <legend>{f.label}{req}</legend>
                <div className="form__opts">{[1, 2, 3, 4, 5].map((n) => <label key={n} className="form__opt"><input type="radio" name={f.name} checked={values[f.name] === String(n)} onChange={() => set(f.name, String(n))} /><span>{n}</span></label>)}</div>
                {err}
              </fieldset>
            );
          }
          if (f.type === 'radio' || f.type === 'multi') {
            const multi = f.type === 'multi';
            return (
              <fieldset className={`${cls} form__choices`} key={f.name}>
                <legend>{f.label}{req}</legend>
                <div className="form__opts">
                  {f.options.map((o) => (
                    <label key={o} className="form__opt">
                      <input type={multi ? 'checkbox' : 'radio'} name={f.name} checked={multi ? (values[f.name] || []).includes(o) : values[f.name] === o} onChange={() => (multi ? toggle(f.name, o) : set(f.name, o))} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
                {err}
              </fieldset>
            );
          }
          return (
            <div className={cls} key={f.name}>
              <label htmlFor={id}>{f.label}{req}</label>
              {f.type === 'textarea' ? <textarea id={id} rows={5} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />
                : f.type === 'country' ? <select id={id} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)}><option value="">Choisir…</option>{countryNames().map((o) => <option key={o}>{o}</option>)}</select>
                : f.type === 'select' ? <select id={id} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)}><option value="">Choisir…</option>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                : <input id={id} type={f.type === 'number' ? 'text' : f.type || 'text'} inputMode={f.type === 'number' ? 'numeric' : undefined} placeholder={f.placeholder} autoComplete={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : undefined} value={values[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />}
              {err}
            </div>
          );
        })}
      </div>
      {status === 'error' && <p className="form__err">{serverError}</p>}
      <button className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>{status === 'sending' ? 'Envoi…' : submitLabel}</button>
    </form>
  );
}
