import FormPage from '@/components/FormPage';

export const metadata = { title: 'Conseil post-mariage' };

export default function Page() {
  return <FormPage type="post_marital" form="post_marital" image="/img/ma2.jpg" submitLabel="Envoyer la demande" />;
}
