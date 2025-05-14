import React from 'react';
import './library.css';
import livre from '../../assets/livre.png';
import gallery1 from '../../assets/gallery1.jpg';
import gallery2 from '../../assets/gallery2.jpg';
import gallery3 from '../../assets/gallery3.jpg';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.jpg';
import gallery6 from '../../assets/gallery6.png';



const Library = () => {
  return (
    <div className="library-container">
      {/* Section haute */}
      <div className="top-section">
        <div className="left-text">
          <h1>Notre librairie</h1>
          <h2>Osez la pureté</h2>
          <p>Un guide pratique pour cheminer jusqu’au mariage sans aller au sexe et enseigner aux autres comment le faire.</p>
          
          <div className="buttons-container">
            <button className="btn other-books-btn">Autres ouvrages →</button>
            <button className="btn order-btn">Commander maintenant →</button>
          </div>
        </div>
        
        <div className="right-image">
          <img src={livre} alt="Illustration" />
        </div>
      </div>

      {/* Galerie d'images */}
      <div className="bottom-gallery">
        <img src={gallery6} alt="Gallery 1" />
        <img src={gallery5} alt="Gallery 2" />
        <img src={gallery4} alt="Gallery 3" />
        <img src={gallery3} alt="Gallery 3" />
        <img src={gallery2} alt="Gallery 3" />
        <img src={gallery1} alt="Gallery 3" />
      </div>

    </div>
  );
};

export default Library;