import FormPage from '@/components/FormPage';
import { IDENT, CONSENT } from '@/lib/fields';

export const metadata = { title: 'Communauté en ligne' };

export default function Page() {
  return <FormPage type="online_community" eyebrow="En ligne" title="Communauté" accent="en ligne" text="Restez connecté(e) à la famille, où que vous soyez." image="/img/image.jpg" intro="Rejoignez notre communauté en ligne pour suivre les cultes, les enseignements et les annonces." submitLabel="Rejoindre" fields={[...IDENT, { name: 'ville', label: 'Ville / Pays' }, CONSENT]} />;
}
