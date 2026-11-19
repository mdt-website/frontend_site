import FormPage from '@/components/FormPage';

export const metadata = { title: 'Témoignage' };

export default function Page() {
  return <FormPage type="testimony" form="testimony" image="/img/discover1.jpg" submitLabel="Envoyer" />;
}
