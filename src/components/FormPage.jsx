import Hero from './Hero';
import RequestForm from './RequestForm';
import { FORMS } from '@/lib/forms';

// Avec `form` : en-tête « Formulaires / Titre / Veuillez renseigner vos informations » puis formulaire calqué sur CCI.
// Sans `form` : ancien format (champs fournis par la page), pour les pages qui n'ont pas d'équivalent CCI.
export default function FormPage({ type, form, eyebrow, title, accent, text, image, intro, fields, submitLabel, successMessage, aside }) {
  return (
    <>
      {form
        ? <Hero eyebrow="Formulaires" title={FORMS[form].title} text={FORMS[form].intro} image={image}><p className="lead">Veuillez renseigner vos informations</p></Hero>
        : <Hero eyebrow={eyebrow} title={title} accent={accent} text={text} image={image} />}
      <section className="section bg-cream">
        <div className="container">
          {!form && intro && <p className="lead center" style={{ marginBottom: '2.5rem' }}>{intro}</p>}
          {aside}
          <RequestForm type={type} form={form} fields={fields} submitLabel={submitLabel} successMessage={successMessage} />
        </div>
      </section>
    </>
  );
}
