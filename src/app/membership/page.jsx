import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Devenir membre' };

export default function Page() {
  return <FormPage type="membership" eyebrow="Famille" title="Devenir" accent="membre" text="Rejoignez la Maison de la Transformation." image="/img/discover2.jpg" intro="Remplissez ce formulaire : un responsable vous contactera pour vous accompagner." submitLabel="Envoyer ma demande" fields={[...IDENT, { name: 'quartier', label: 'Quartier / Ville' }, { name: 'bapteme', label: 'Êtes-vous baptisé(e) ?', type: 'select', options: ['Oui', 'Non'] }, CONSENT]} />;
}
