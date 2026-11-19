import FormPage from '@/components/FormPage';

export const metadata = { title: 'Enquête de satisfaction' };

export default function Page() {
  return <FormPage type="feedback" form="feedback" image="/img/discover1.jpg" submitLabel="Envoyer mes réponses" />;
}
