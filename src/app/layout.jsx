import { Marcellus, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const display = Marcellus({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const body = Montserrat({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: { default: 'La Maison de la Transformation', template: '%s | La Maison de la Transformation' },
  description: 'Une église où le Seigneur nous transforme à son image, de gloire en gloire. Abomey-Calavi, Bénin.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
