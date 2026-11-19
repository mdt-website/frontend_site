'use client';
import { useActionState } from 'react';
import { issueCertificates } from '../../actions';

export default function CertForm({ eligible, today, mailOn }) {
  const [state, action, pending] = useActionState(issueCertificates, null);
  return (
    <>
      {state?.error && <p className="adm__msg adm__msg--err" role="alert">{state.error}</p>}
      {state?.ok && <p className="adm__msg" role="status">{state.ok}</p>}
      <form action={action} className="adm__panel adm__form">
        <strong>1. Modèle et détails</strong>
        <div className="adm__row2">
          <div><label htmlFor="title">Intitulé de la formation *</label><input id="title" name="title" required defaultValue="École des membres" /></div>
          <div><label htmlFor="issuedOn">Date de remise *</label><input id="issuedOn" name="issuedOn" type="date" required defaultValue={today} /></div>
        </div>
        <div className="adm__row2">
          <div><label htmlFor="sender">Signataire</label><input id="sender" name="sender" defaultValue="Pasteur Herbert Donald" /></div>
          <div><label htmlFor="subject">Objet de l’email</label><input id="subject" name="subject" placeholder="Votre certificat" /></div>
        </div>
        <strong>2. Destinataires</strong>
        {eligible.length > 0 && (
          <fieldset style={{ border: '1px solid #e6e2d6', borderRadius: 8, padding: '.6rem 1rem' }}>
            <legend>Parcours terminés, pas encore certifiés</legend>
            {eligible.map((e) => <label key={e.id} style={{ display: 'block' }}><input type="checkbox" name="enrollment" value={e.id} /> {e.name} ({e.email}) : {e.course}</label>)}
          </fieldset>
        )}
        <div><label htmlFor="manual">Ajouter à la main : un par ligne, « Nom, email » (l’email est facultatif)</label><textarea id="manual" name="manual" rows={5} /></div>
        <p className="adm__msg">{mailOn ? 'Les emails seront envoyés automatiquement.' : 'Aucun serveur d’envoi configuré (SMTP_URL) : les certificats seront émis, avec un lien à copier pour chaque personne.'}</p>
        <div><button className="adm__btn" disabled={pending}>{pending ? 'Émission…' : '3. Émettre et envoyer'}</button></div>
      </form>
      {state?.results && (
        <div className="adm__scroll"><table>
          <thead><tr><th>Nom</th><th>Email</th><th>Lien du certificat</th><th>Résultat</th></tr></thead>
          <tbody>{state.results.map((r, i) => <tr key={i}><td>{r.name}</td><td>{r.email || '—'}</td><td><a href={r.link} target="_blank" rel="noopener noreferrer">{r.link}</a></td><td>{r.status}</td></tr>)}</tbody>
        </table></div>
      )}
    </>
  );
}
