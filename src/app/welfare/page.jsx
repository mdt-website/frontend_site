import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Aide sociale' };

export default function Page() {
  return <FormPage type="welfare" eyebrow="Entraide" title="Aide" accent="sociale" text="L’église est une famille : exposez-nous votre besoin." image="/img/about.jpg" intro="Toutes les demandes sont traitées avec discrétion par l’équipe d’entraide." submitLabel="Envoyer la demande" fields={[...IDENT, { name: 'besoin', label: 'Nature du besoin', type: 'select', required: true, options: ['Alimentaire', 'Santé', 'Scolarité', 'Logement', 'Autre'] }, { name: 'message', label: 'Détails', type: 'textarea', required: true }, CONSENT]} />;
}
