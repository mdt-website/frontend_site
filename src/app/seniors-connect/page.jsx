import FormPage from '@/components/FormPage';

export const metadata = { title: 'Seniors Connect' };

export default function Page() {
  return <FormPage type="seniors_connect" form="seniors_connect" image="/img/about.jpg" submitLabel="Envoyer" />;
}
