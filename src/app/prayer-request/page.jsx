import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Requête de prière' };

export default function Page() {
  return <FormPage type="prayer" eyebrow="Prière" title="Requête de" accent="prière" text="Nous croyons à la puissance de la prière." image="/img/Mum2.jpg" intro="Partagez votre sujet de prière. Notre équipe d’intercession prie avec vous, en toute confidentialité." submitLabel="Envoyer ma requête" fields={[...IDENT, { name: 'sujet', label: 'Votre sujet de prière', type: 'textarea', required: true }, { name: 'confidentiel', label: 'Cette requête est confidentielle', type: 'checkbox' }]} />;
}
