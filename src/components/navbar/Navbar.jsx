import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className='mdt__navbar'>
      <div className='mdt__navbar-container'>
        
        {/* Logo cliquable qui ramène à l'accueil */}
        <div className='mdt__navbar-container__logo'>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Bouton burger pour mobile */}
        <button 
          className="menu-burger" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Liens de navigation */}
        <div className={`mdt__navbar-container_links ${menuOpen ? 'show' : ''}`}>
          <Link to="/about">À propos</Link>
          <Link to="/sermon">Sermons & Ressources</Link>
          <Link to="/evenements">Événements</Link>
          <Link to="/ministry">Ministère & Enseignements</Link>
          <Link to="/contact">Contacts</Link>
          <button className="donate">Faire un don</button>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
