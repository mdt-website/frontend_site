import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Certificat' };

export default function Page() {
  return <FormPage type="class_certificate" eyebrow="Classes de membres" title="Certificat" accent="" text="" image="/img/about.jpg" submitLabel="Demander mon certificat" fields={[...IDENT, { name: 'classe', label: 'Classe concernée', type: 'select', options: ['Niveau 1', 'Niveau 2'] }, CONSENT]} />;
}
