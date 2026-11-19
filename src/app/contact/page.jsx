import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Nous contacter' };

export default function Page() {
  return <FormPage type="contact" eyebrow="Contact" title="Nous" accent="contacter" text="Nous serons ravis de vous lire." image="/img/con.jpg" intro="Un témoignage, une question, un sujet : écrivez-nous." submitLabel="Envoyer le message" fields={[...IDENT, { name: 'message', label: 'Votre message', type: 'textarea', required: true }]} />;
}
