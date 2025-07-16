import React, { useState, useEffect } from 'react';
import './evhead.css';
// Importez vos images locales
import image1 from '../../assets/evhea1.jpg';
import image2 from '../../assets/con.jpg';
import image3 from '../../assets/about.jpg';
import image4 from '../../assets/evhea1.jpg';

const Evhead = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    image1,
    image2,
    image3,
    image4,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 10 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="evhead-container">
      <div className="evhead-carousel">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`evhead-slide ${index === currentIndex ? 'evhead-active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="evhead-main-title">Les événements</div>
      <div className="evhead-controls">
        {images.map((_, index) => (
          <button
            key={index}
            className={`evhead-dot ${index === currentIndex ? 'evhead-dot-active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Evhead;