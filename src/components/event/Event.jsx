import React from "react";
import culte from "../../assets/culte.png"; // Import de l'image (ajustez le chemin)
import { IoTimeOutline } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";


const Event = ({ day, month, title, time, location }) => {
  return (
    <div className="event" style={{ width: "700px" }}>
      <div className="event-date">
        <span className="event-day">{day}</span>
        <span className="event-month">{month}</span>
      </div>
      
      {/* Div pour l'image avec import réel */}
      <div className="event-image">
        <img 
          src={culte} 
          alt="Événement" 
          style={{ 
            width: "50px", 
            height: "50px", 
            borderRadius: "3 px",
            objectFit: "cover"
          }} 
        />
      </div>
      
      <div className="event-details" style={{ flex: 1, margin: "0 15px" }}>
        <h3 className="event-title">{title}</h3>
        <p className="event-time-location">
          <span className="event-time">
            <IoTimeOutline style={{ marginRight: "5px", verticalAlign: "middle" }} />
            {time}
            </span>
          <span className="event-location">
               <IoIosPerson style={{ marginRight: "5px", verticalAlign: "middle" }} />  
            {location}
          </span>
        </p>
      </div>
      
      {/* Bouton Découvrir avec espacement */}
      <button 
        className="event-discover-button"
        style={{ 
          marginLeft: "auto",
          padding: "8px 16px",
          whiteSpace: "nowrap"
        }}
      >
        Découvrir →
      </button>
    </div>
  );
};

export default Event;