import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Conseil pastoral' };

export default function Page() {
  return <FormPage type="counselling" eyebrow="Accompagnement" title="Conseil" accent="pastoral" text="Une écoute biblique, sans jugement." image="/img/discover1.jpg" intro="Mariage, famille, vie spirituelle, décisions importantes : prenez rendez-vous avec un conseiller." submitLabel="Demander un rendez-vous" fields={[...IDENT, { name: 'categorie', label: 'Type d’accompagnement', type: 'select', required: true, options: ['Famille', 'Vie spirituelle', 'Décision importante', 'Autre'] }, { name: 'message', label: 'Décrivez brièvement votre besoin', type: 'textarea' }, CONSENT]} />;
}
