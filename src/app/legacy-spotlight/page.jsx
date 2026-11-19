import FormPage from '@/components/FormPage';

export const metadata = { title: 'Legacy : projets à l’honneur' };

export default function Page() {
  return <FormPage type="legacy_spotlight" form="legacy_spotlight" image="/img/fond2.jpg" submitLabel="Envoyer" />;
}
