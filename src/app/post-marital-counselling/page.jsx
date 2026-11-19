import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Conseil post-mariage' };

export default function Page() {
  return <FormPage type="post_marital" eyebrow="Mariage" title="Conseil" accent="post-mariage" text="Fortifier votre foyer, jour après jour." image="/img/ma2.jpg" intro="Mariés ? Un conseiller est disponible pour vous accompagner en couple." submitLabel="Demander un rendez-vous" fields={[...IDENT, { name: 'conjoint', label: 'Nom de votre conjoint(e)', required: true }, { name: 'message', label: 'Décrivez brièvement votre besoin', type: 'textarea' }, CONSENT]} />;
}
