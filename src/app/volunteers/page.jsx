import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Devenir bénévole' };

export default function Page() {
  return <FormPage type="volunteer" eyebrow="Servir" title="Devenir" accent="bénévole" text="Mettez vos dons au service de la maison." image="/img/gallery3.jpg" intro="Dites-nous dans quel domaine vous souhaitez servir." submitLabel="Je m’engage" fields={[...IDENT, { name: 'ministere', label: 'Ministère souhaité', type: 'select', options: ['Louange', 'Accueil & Protocole', 'Jeunesse', 'Enfants', 'Intercession', 'Médias', 'Autre'] }, CONSENT]} />;
}
