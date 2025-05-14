import React, { useEffect, useState } from 'react';
import './nextCulte.css';

const NextCulte = () => {
  const [countdown, setCountdown] = useState('00 : 00 : 00');

  useEffect(() => {
    const target = getNextCulteTime();

    const interval = setInterval(() => {
      const now = new Date();
      const distance = target - now;

      if (distance <= 0) {
        setCountdown('00 : 00 : 00');
        clearInterval(interval);
        return;
      }

      const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');

      setCountdown(`${hours} : ${minutes} : ${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getNextCulteTime = () => {
    const now = new Date();
    const nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
    nextSunday.setHours(8, 0, 0, 0); // Premier culte à 08h00
    return nextSunday;
  };

  return (
    <div className="next-culte">
      <div className="jour">DIMANCHE</div>
      <div className="separateur">|</div>
      <div className="texte">Prochain culte dans : </div>
      <div className="compteur">{countdown}</div>
      <div className="separateur">|</div>
      <div className="campus">MDT Calavi</div>
      <div className="horaires">
        <span>
           <div>08:00</div> 
          <div>10:00</div>
        </span>
        <span>
           <div>17:00</div> 
          <div>20:00</div>
        </span>
      </div>
    </div>
  );
};

export default NextCulte;
