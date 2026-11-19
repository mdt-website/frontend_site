import FormPage from '@/components/FormPage';

export const metadata = { title: 'Communauté en ligne' };

export default function Page() {
  return <FormPage type="online_community" form="online_community" image="/img/image.jpg" submitLabel="Rejoindre" />;
}
