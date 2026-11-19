import FormPage from '@/components/FormPage';

export const metadata = { title: 'Aide sociale' };

export default function Page() {
  return <FormPage type="welfare" form="welfare" image="/img/about.jpg" submitLabel="Envoyer la demande" />;
}
