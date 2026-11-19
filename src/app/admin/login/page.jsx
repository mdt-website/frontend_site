import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth';
import LoginForm from './LoginForm';
import '../admin.css';

export const metadata = { title: 'Connexion – Back-office', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await getUser()) redirect('/admin');
  return (
    <div className="adm adm__login" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
      <LoginForm />
    </div>
  );
}
