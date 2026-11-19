import FormPage from '@/components/FormPage';

export const metadata = { title: 'Classe de membres : terminée' };

export default function Page() {
  return <FormPage type="class_certificate" form="class_certificate" image="/img/about.jpg" submitLabel="Demander mon certificat" />;
}
