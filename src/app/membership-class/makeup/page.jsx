import FormPage from '@/components/FormPage';

export const metadata = { title: 'Classe de membres : rattrapage' };

export default function Page() {
  return <FormPage type="class_makeup" form="class_makeup" image="/img/about.jpg" submitLabel="Demander un rattrapage" />;
}
