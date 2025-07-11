import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-number">404</div>
        <h1 className="not-found-title">Page non trouvée</h1>
        <p className="not-found-message">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-button">
            Retour à l'accueil
          </Link>
          <Link to="/contact" className="not-found-button secondary">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;