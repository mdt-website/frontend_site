import FormPage from '@/components/FormPage';

export const metadata = { title: 'Deuxième visite' };

export default function Page() {
  return <FormPage type="second_timer" form="second_timer" image="/img/gallery3.jpg" submitLabel="Envoyer" />;
}
