import Hero from '@/components/Hero';
import RequestForm from '@/components/RequestForm';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Célébrations' };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Formulaires" title="Célébrons vos" accent="moments spéciaux" text="Nous sommes aussi heureux que vous pour votre grand jour." image="/img/gallery3.jpg" />
      <section className="section bg-cream">
        <div className="container">
          <div className="card" style={{ maxWidth: 700, margin: '0 auto 2.5rem' }}>
            <h3>Merci de respecter ces délais</h3>
            <ul className="stack" style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '.95em' }}>
              <li><strong>Action de grâce de mariage :</strong> un dimanche, au moins 2 semaines à l’avance.</li>
              <li><strong>Présentation d’enfant :</strong> un dimanche, au moins 2 semaines à l’avance.</li>
              <li><strong>Cérémonie de nom :</strong> au moins 3 jours à l’avance.</li>
            </ul>
            <p className="note" style={{ textAlign: 'left' }}>[Délais à confirmer par l’église.]</p>
          </div>
          <RequestForm type="celebration" submitLabel="Envoyer la demande" fields={[...IDENT, { name: 'evenement', label: 'Type de célébration', type: 'select', required: true, options: ['Action de grâce de mariage', 'Présentation d’enfant', 'Cérémonie de nom', 'Anniversaire', 'Autre'] }, { name: 'date', label: 'Date souhaitée', type: 'date', required: true }, { name: 'message', label: 'Précisions', type: 'textarea' }, CONSENT]} />
        </div>
      </section>
    </>
  );
}
