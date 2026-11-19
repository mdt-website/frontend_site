import FormPage from '@/components/FormPage';

export const metadata = { title: 'Jeunesse : retour d’expérience' };

export default function Page() {
  return <FormPage type="youth_feedback" form="youth_feedback" image="/img/Link.jpg" submitLabel="Envoyer mes réponses" />;
}
