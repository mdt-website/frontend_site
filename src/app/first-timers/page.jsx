import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Première visite' };

export default function Page() {
  return <FormPage type="first_timer" eyebrow="Bienvenue" title="Première" accent="visite" text="Vous êtes ici chez vous." image="/img/gallery3.jpg" intro="Faites-vous connaître pour que nous puissions vous accueillir comme il se doit." submitLabel="Je me présente" fields={[...IDENT, { name: 'connu', label: 'Comment nous avez-vous connus ?', type: 'select', options: ['Un ami', 'Réseaux sociaux', 'YouTube', 'Passage devant l’église', 'Autre'] }, { name: 'message', label: 'Un mot pour nous', type: 'textarea' }, CONSENT]} />;
}
