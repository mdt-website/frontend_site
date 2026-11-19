import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SITE, FOOTER_COLS } from '@/lib/site';
import RequestForm from './RequestForm';

const ext = (h) => h.startsWith('http');

export default function Footer() {
  return (
    <>
      <section className="give">
        <div className="container stack">
          <h2>Donner à la Maison de la Transformation</h2>
          <p className="lead">Votre générosité continue de bénir des vies, merci de donner.</p>
          <div className="btn-row">
            <Link href="/give" className="btn btn-white">Donner maintenant</Link>
            <Link href="/building-project" className="btn btn-navy">Projet de construction</Link>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container footer__mail">
          <h2>Rejoignez notre liste de diffusion</h2>
          <p>Pas de spam : seulement des contenus qui édifient, envoyés régulièrement par la Maison de la Transformation.</p>
          <RequestForm type="newsletter" inline submitLabel="S'inscrire" fields={[{ name: 'email', label: 'Email', type: 'email', required: true }]} successMessage="Merci, vous êtes inscrit(e) !" />
        </div>
        <div className="container"><hr className="footer__line" /></div>
        <div className="container footer__main">
          <div className="footer__brand">
            <img src="/img/logo.png" alt="La Maison de la Transformation" />
            <p>{SITE.address}</p>
            <p style={{ marginTop: '.8rem' }}><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a href={SITE.phoneHref}>{SITE.phone}</a></p>
          </div>
          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <ul>{c.links.map(([label, href]) => (
                <li key={label}>{ext(href) ? <a href={href} target="_blank" rel="noopener noreferrer">{label}</a> : <Link href={href}>{label}</Link>}</li>
              ))}</ul>
            </div>
          ))}
        </div>
        <div className="container"><hr className="footer__line" /></div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} La Maison de la Transformation. Tous droits réservés.</span>
          <div className="footer__social">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
