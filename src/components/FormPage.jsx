import Hero from './Hero';
import RequestForm from './RequestForm';

export default function FormPage({ eyebrow, title, accent, text, image, intro, type, fields, submitLabel, successMessage, aside }) {
  return (
    <>
      <Hero eyebrow={eyebrow} title={title} accent={accent} text={text} image={image} />
      <section className="section bg-cream">
        <div className="container center">
          {intro && <p className="lead" style={{ marginBottom: '2.5rem' }}>{intro}</p>}
          {aside}
          <RequestForm type={type} fields={fields} submitLabel={submitLabel} successMessage={successMessage} />
        </div>
      </section>
    </>
  );
}
