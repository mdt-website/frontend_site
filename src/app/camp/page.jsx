import FormPage from '@/components/FormPage';

export const metadata = { title: 'Camp : inscription' };

export default function Page() {
  return <FormPage type="camp_registration" form="camp_registration" image="/img/fond1.jpg" submitLabel="Envoyer mon inscription" />;
}
