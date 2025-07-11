import React from 'react';
import './whous.css';

const Whous = () => {
  return (
    <div className="whous-container">
      
      <div className="whous-conta-grid">
        {/* Téléphone */}
        <div className="conta-card">
          <div className="conta-icon">📞</div>
          <h3>Telephone</h3>
          <p>Joignez-nous par Whatsapp ou par appel direct au</p>
          <a href="tel:2290141373741" className="conta-link">
            (229) 01 41 37 37 41
          </a>
        </div>

        {/* Email */}
        <div className="conta-card">
          <div className="conta-icon">✉️</div>
          <h3>Email</h3>
          <p>Nous serons très ravis de vous lire. Que ce soit un témoignage ou tout autre sujet</p>
          <a href="mailto:info@maisondelatransformation.com" className="conta-link">
            info@maisondelatransformation.com
          </a>
        </div>

        {/* Localisation */}
        <div className="conta-card">
          <div className="conta-icon">📍</div>
          <h3>Localisation</h3>
          <p>Nous sommes situés à</p>
          <address className="conta-address">
            Ex(Big Man Hôtel), Zogbadjè,<br />
            non loin du Petit portail du Campus d'Abomey-Calavi
          </address>
        </div>
      </div>
    </div>
  );
};

export default Whous;
