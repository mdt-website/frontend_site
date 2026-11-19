import Link from 'next/link';
import { redirect } from 'next/navigation';
import Hero from '@/components/Hero';
import { getStudent } from '@/lib/auth';
import AuthForm from '../AuthForm';

export const metadata = { title: 'Connexion – Formation' };
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  if (await getStudent()) redirect('/lms');
  const signup = (await searchParams).mode === 'signup';
  return (
    <>
      <Hero eyebrow="Formation" title={signup ? 'Créer mon' : 'Me'} accent={signup ? 'compte' : 'connecter'} image="/img/fond1.jpg" />
      <section className="section"><div className="container" style={{ maxWidth: 520 }}>
        <AuthForm mode={signup ? 'signup' : 'login'} />
        <p className="center mt">{signup ? <>Déjà un compte ? <Link href="/lms/login">Se connecter</Link></> : <>Pas encore de compte ? <Link href="/lms/login?mode=signup">Créer un compte</Link></>}</p>
      </div></section>
    </>
  );
}
