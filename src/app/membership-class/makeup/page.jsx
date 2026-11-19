import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Rattrapage' };

export default function Page() {
  return <FormPage type="class_makeup" eyebrow="Classes de membres" title="Rattrapage" accent="" text="" image="/img/about.jpg" submitLabel="Demander un rattrapage" fields={[...IDENT, { name: 'classe', label: 'Classe concernée', type: 'select', options: ['Niveau 1', 'Niveau 2'] }, CONSENT]} />;
}
