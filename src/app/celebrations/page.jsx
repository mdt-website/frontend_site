import Hero from '@/components/Hero';
import RequestForm from '@/components/RequestForm';
import { FORMS } from '@/lib/forms';

export const metadata = { title: 'Célébrations' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Formulaires" title={FORMS.celebration.title} text="Veuillez renseigner vos informations" image="/img/gallery3.jpg" />
      <section className="section bg-cream">
        <div className="container">
          <div className="card" style={{ maxWidth: 860, margin: '0 auto 2.5rem' }}>
            <h3>Merci de respecter ces délais</h3>
            <ul className="stack" style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '.95em' }}>
              <li><strong>Action de grâce de mariage :</strong> un dimanche, au moins 2 semaines à l’avance.</li>
              <li><strong>Présentation d’enfant :</strong> un dimanche, au moins 2 semaines à l’avance.</li>
              <li><strong>Cérémonie de nomination :</strong> au moins 3 jours à l’avance.</li>
            </ul>
            <p className="note" style={{ textAlign: 'left' }}>[Délais à confirmer par l’église.]</p>
          </div>
          <RequestForm type="celebration" form="celebration" submitLabel="Envoyer la demande" />
        </div>
      </section>
    </>
  );
}
