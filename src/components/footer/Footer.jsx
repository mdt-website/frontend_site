import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className='principale'>
        <div className="footer-columns">
          <div className="footer-title">
            <h1>Nous vous accueillons à bras ouverts</h1>
          </div>

          <div className="footer-col address-col">
            <h2>Adresse Principale</h2>
            <address>
              <p>Ex(Big Man Hôtel), Zogbadjè, non loin du Petit portail du Campus d'Abomey-Calavi</p>
            </address>

            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61564409844332" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon" />
              </a>
              <a href="https://www.youtube.com/@LaMaisondelaTransformation" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="social-icon" />
              </a>
              <a href="https://www.instagram.com/lamaisonde_latransformation/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-col contact-col">
            <h2>Nous laisser un message</h2>
            <div className="contact-info">
              <a href="mailto:info@maisondelatransformation.com" className="contact-link">
                info@maisondelatransformation.com
              </a>
              <a href="tel:+2294373741" className="contact-link">
                +229 014 137 3741
              </a>
            </div>
          </div>
        </div>
      </div>

  
    
      <div className='secondaire'> 
        <div className="footer-links">
          <div className="footer-nav-links">
            <Link to="/about">↑  À propos</Link>
            <Link to="/sermon">↑  Sermons & Ressources</Link>
            <Link to="/evenements">↑   Événements</Link>
            <Link to="/ministry">↑   Ministère & Enseignements</Link>
            <span className="copyright">Maison de la transformation © 2025. Tout droit réservé.</span>          
          </div>


        </div>
      </div>
    </div>
  );
};

export default Footer;