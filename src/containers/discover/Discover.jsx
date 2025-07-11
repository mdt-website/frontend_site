import React from 'react';
import './discover.css';
import img1 from '../../assets/discover1.jpg';
import img2 from '../../assets/discover2.jpg';
import videoThumbnail from '../../assets/genese.png'; // capture d’aperçu facultative
import geneseVideo from '../../assets/genese.mp4';

const Discover = () => {
  return (
    <section className="discover-section">
      <p className="discover-subtitle">La Maison de la Transformation</p>
      <h2 className="discover-heading">Découvrez la vie<br />de l’église</h2>

      <h3 className="discover-core">
        Une <span className="highlight-box">église</span> où le <br />
        Seigneur nous <br />
        <span className="gold-text">→ transforme</span> à son <br />
        Image de <span className="blue-text">Gloire</span> en <span className="gold-text">Gloire.</span>
      </h3>

      {/* Décoration d’images */}
      <img src={img1} alt="Église 1" className="discover-img img-left" />
      <img src={img2} alt="Église 2" className="discover-img img-right" />

      {/* Section vidéo - La genèse */}
      <div className="genese-section">
        <h2 className="genese-title">La genèse</h2>
        <span className="genese-arrow">↓</span>
        <div className="video-container">
          <video
            className="video-player"
            src={geneseVideo}
            controls
            autoPlay
            muted
            loop
            playsInline
            poster={videoThumbnail} // facultatif
          />
        </div>
      </div>
    </section>
  );
};

export default Discover;
