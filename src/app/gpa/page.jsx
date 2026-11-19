import FormPage from '@/components/FormPage';

export const metadata = { title: 'Rapport de présence du protocole' };

export default function Page() {
  return <FormPage type="protocol_attendance" form="protocol_attendance" image="/img/gallery3.jpg" submitLabel="Envoyer le rapport" />;
}
