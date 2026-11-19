import FormPage from '@/components/FormPage';

export const metadata = { title: 'Requête de prière' };

export default function Page() {
  return <FormPage type="prayer" form="prayer" image="/img/Mum2.jpg" submitLabel="Envoyer ma requête" />;
}
