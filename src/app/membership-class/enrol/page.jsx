import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Inscription' };

export default function Page() {
  return <FormPage type="class_enrol" eyebrow="Classes de membres" title="Inscription" accent="" text="" image="/img/about.jpg" submitLabel="Je m’inscris" fields={[...IDENT, { name: 'classe', label: 'Classe concernée', type: 'select', options: ['Niveau 1', 'Niveau 2'] }, CONSENT]} />;
}
