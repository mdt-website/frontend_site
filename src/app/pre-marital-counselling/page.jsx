import FormPage from '@/components/FormPage';

export const metadata = { title: 'Conseil pré-mariage' };

export default function Page() {
  return <FormPage type="pre_marital" form="pre_marital" image="/img/ma1.jpg" submitLabel="Envoyer la demande" />;
}
