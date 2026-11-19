import FormPage from '@/components/FormPage';

export const metadata = { title: 'Programme Legacy Fellows' };

export default function Page() {
  return <FormPage type="legacy_fellow" form="legacy_fellow" image="/img/fond2.jpg" submitLabel="Envoyer ma candidature" />;
}
