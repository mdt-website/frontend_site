import React from 'react';
import './map.css';

const Map = () => {
  return (
    <div className="map-iframe">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.762110582834!2d2.3359017735411345!3d6.424603093566387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1024a9001215d2d9%3A0xb946e6a7f1f73e71!2sMaison%20de%20la%20Transformation%20Calavi!5e0!3m2!1sfr!2sbj!4v1751844236092!5m2!1sfr!2sbj"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Maison de la Transformation Calavi"
      ></iframe>
    </div>
  );
};

export default Map;
