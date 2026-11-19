import FormPage from '@/components/FormPage';

export const metadata = { title: 'Devenir membre' };

export default function Page() {
  return <FormPage type="membership" form="membership" image="/img/discover2.jpg" submitLabel="Envoyer ma demande" />;
}
