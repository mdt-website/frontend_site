import React from 'react';
import './contactHead.css';
import about from '../../assets/about.jpg'

const ContactHead = () => {
  return (
    <div className="contact-container ">
      <div className="contact-image">
        <img src={about} alt="Contact" />
      </div>
      <h1 className="contact-title">Nous contacter ?</h1>
    </div>
  );
}

export default ContactHead;


  