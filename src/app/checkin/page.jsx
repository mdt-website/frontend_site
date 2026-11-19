import Hero from '@/components/Hero';
import CheckinForm from './CheckinForm';

export const metadata = { title: 'Présence au culte', robots: { index: false } };

export default function Page() {
  return (
    <>
      <Hero eyebrow="Présence" title="Bienvenue à la" accent="Maison" text="Saisissez le code à 4 chiffres affiché à l’écran pendant le culte." image="/img/church-image.jpg" />
      <section className="section bg-cream"><div className="container"><CheckinForm /></div></section>
    </>
  );
}
