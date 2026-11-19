import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Partagez votre témoignage' };

export default function Page() {
  return <FormPage type="testimony" eyebrow="Témoignage" title="Partagez votre" accent="témoignage" text="Ce que Dieu a fait dans votre vie encourage d’autres." image="/img/discover1.jpg" intro="Racontez-nous votre témoignage ; nous pourrons le partager avec votre accord." submitLabel="Envoyer" fields={[...IDENT, { name: 'message', label: 'Votre témoignage', type: 'textarea', required: true }, { name: 'publier', label: 'J’autorise la publication de mon témoignage', type: 'checkbox' }]} />;
}
