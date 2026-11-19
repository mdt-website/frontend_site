import FormPage from '@/components/FormPage';

export const metadata = { title: 'Préparer sa vie' };

export default function Page() {
  return <FormPage type="pfl" form="pfl" image="/img/discover2.jpg" submitLabel="Je m’inscris" />;
}
