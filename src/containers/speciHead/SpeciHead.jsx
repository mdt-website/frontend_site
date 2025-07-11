import React from 'react';
import './speciHead.css'; 
import { Link } from 'react-router-dom';
import fond1 from'../../assets/fond1.jpg'
import fond2 from'../../assets/fond2.png'
import logo from'../../assets/logo.png'


const SpeciHead = () => {

  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div className="mdt__specihead">
      <div className="mdt__specihead-back">
        <img src={fond1} alt="back1" className="mdt__specihead-back1" />
        <img src={fond2} alt="back2"  className="mdt__specihead-back2"/>
      </div>
      <div className="mdt__specihead-logo">
         <Link to="/">
          <img src={logo} alt="logo" className="mdt__specihead-logo " />
        </Link>
      </div>      
      <div className="mdt__specihead-container">

        <button 
          className="menu-burger" 
          onClick={() => setMenuOpen(!menuOpen)}
          >
          ☰
        </button>
        <div className={`mdt__specihead-container_links ${menuOpen ? 'show' : ''}`}>
           <Link to="/">Accueil</Link>
           <Link to="/about">À propos</Link>
           <Link to="/sermon">Sermons & Ressources</Link>
           <Link to="/evenements">Événements</Link>
           <Link to="/ministry">Ministère & Enseignements</Link>
           <Link to="/contact">Contacts</Link>
          <button className="donate-button">Faire un don</button>
        </div>
    </div>
    <div className='mdt__specihead-text section--margin'>
            <h1 className='  section__margin '>Foi, Amour,et croissance vous attendent ici</h1>
    </div> 

    </div>
  );
};

export default SpeciHead;
