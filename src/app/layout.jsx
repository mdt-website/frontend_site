import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chrome from '@/components/Chrome';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-body', display: 'swap' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maisondelatransformation.com';

export const viewport = { themeColor: '#0b1633' };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'La Maison de la Transformation', template: '%s | La Maison de la Transformation' },
  description: 'Une église où le Seigneur nous transforme à son image, de gloire en gloire. Abomey-Calavi, Bénin.',
  openGraph: { type: 'website', locale: 'fr_FR', siteName: 'La Maison de la Transformation', images: ['/img/church-image.jpg'] },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body>
        <a href="#contenu" className="skip">Aller au contenu</a>
        <Chrome nav={<Navbar />} footer={<Footer />}>{children}</Chrome>
      </body>
    </html>
  );
}
