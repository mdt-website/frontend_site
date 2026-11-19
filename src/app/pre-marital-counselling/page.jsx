import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Conseil pré-mariage' };

export default function Page() {
  return <FormPage type="pre_marital" eyebrow="Mariage" title="Conseil" accent="pré-mariage" text="Bâtir un foyer sur le Rocher." image="/img/ma1.jpg" intro="Préparez votre mariage avec l’accompagnement de l’église." submitLabel="Demander un rendez-vous" fields={[...IDENT, { name: 'partenaire', label: 'Nom de votre fiancé(e)', required: true }, { name: 'date', label: 'Date de mariage envisagée', type: 'date' }, { name: 'message', label: 'Un mot pour nous', type: 'textarea' }, CONSENT]} />;
}
