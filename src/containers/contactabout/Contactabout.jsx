import React from 'react';
import './contactabout.css';
import con from '../../assets/con.jpg'; // Tu peux changer l’image ici si besoin

const ContactAbout = () => {
  return (
    <div className="contactabout-container">
      <div className="contactabout-image">
        <img src={con} alt="À propos" />
      </div>
      <h1 className="contactabout-title">À propos de nous...</h1>
    </div>
  );
};

export default ContactAbout;
