import React from 'react';
import './interweekGram.css';
import { IoTimeOutline } from 'react-icons/io5';
import { IoIosPerson } from 'react-icons/io';

const interweekData = [
  {
    day: "Lundi",
    title: "Grand Rassemblement de Zone (GRZ - Cellule)",
    time: "20:00 GMT+1",
    host: "Hôte de cellule",
    button: true,
  },
  {
    day: "Mercredi",
    title: "Mercredi de Gloire",
    time: "19:00 GMT+1 ",
  },

  {
    day: "Vendredi",
    title: "Veillée (Sur toutes les églises)",
    time: "20:00 - 00:00 GMT+1 ",
  },
];

const InterweekGram = () => {
  return (
    <div className="interweek-container">
      <h4 className="interweek-subtitle">Nos programmes</h4>
      <h2 className="interweek-title">intersemaines</h2>

      {interweekData.map((item, index) => (
        <div className="interweek-row" key={index}>
          <div className="interweek-day">{item.day}</div>
          <div className="interweek-details">
            <div className="interweek-title-text">{item.title}</div>
            <div className="interweek-info">
              <span><IoTimeOutline /> {item.time}</span>
              {item.host && (
                <span><IoIosPerson /> {item.host}</span>
              )}
            </div>
          </div>
          {item.button && (
            <button className="interweek-button">
              Devenir Hôte de Cellule →
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InterweekGram;
