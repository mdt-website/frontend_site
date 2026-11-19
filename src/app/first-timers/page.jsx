import FormPage from '@/components/FormPage';

export const metadata = { title: 'Première visite' };

export default function Page() {
  return <FormPage type="first_timer" form="first_timer" image="/img/gallery3.jpg" submitLabel="Je me présente" />;
}
