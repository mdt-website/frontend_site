import FormPage from '@/components/FormPage';

export const metadata = { title: 'Devenir bénévole' };

export default function Page() {
  return <FormPage type="volunteer" form="volunteer" image="/img/gallery3.jpg" submitLabel="Je m’engage" />;
}
