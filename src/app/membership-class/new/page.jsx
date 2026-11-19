import FormPage from '@/components/FormPage';

export const metadata = { title: 'Classe de membres : inscription' };

export default function Page() {
  return <FormPage type="class_enrol" form="class_enrol" image="/img/about.jpg" submitLabel="Je m’inscris" />;
}
