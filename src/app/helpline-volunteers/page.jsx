import FormPage from '@/components/FormPage';

export const metadata = { title: 'Bénévoles de la ligne d’écoute' };

export default function Page() {
  return <FormPage type="helpline_volunteer" form="helpline_volunteer" image="/img/gallery3.jpg" submitLabel="Envoyer" />;
}
