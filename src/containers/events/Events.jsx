// components/Events.js
import React, { useState } from "react";
import Event from "../../components/event/Event";
import  './events.css';


const Events = () => {
  // Données des événements (peuvent venir d'une API ou props)
  const [events, setEvents] = useState([
    {
      id: 1,
      day: "26",
      month: "Juillet 2025",
      title: "Classe Basic Niveau I & 2",
      time: "19:30 GMT+1",
      location: "AP Guy-Valery & AP Nikè",
    },
    {
      id: 2,
      day: "27",
      month: "Juillet 2025",
      title: "Mercredi de Gloire",
      time: "19:30 GMT+1",
      location: "Pst HDM",
    },
    {
      id: 3,
      day: "28",
      month: "Juillet 2025",
      title: "Veillée des célibataires (partie 3)",
      time: "20:30 GMT+1",
      location: "Pst HDM",
    },
    {
      id: 4,
      day: "01",
      month: "Aout 2025",
      title: "Rencontre des femmes missionnaires",
      time: "18:30 GMT+1",
      location: "AP Audrey & AP Nikè",
    },
  ]);

  // Gestion de la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3; // Nombre d'événements à afficher par page

  // Calcul des événements à afficher
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Changement de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="events-container">
      <h2 className="section-title">Nos programmes</h2>
      <h3 className="section-subtitle">Prochains événements</h3>

      <div className="events-list">
        {currentEvents.map((event) => (
          <Event
            key={event.id}
            day={event.day}
            month={event.month}
            title={event.title}
            time={event.time}
            location={event.location}
          />
        ))}
      </div>

      <div className="events-navigation">
        <button
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="nav-button prev-button"
        >
          ← Prev
        </button>

        <span className="page-number">{currentPage}</span>

        <button
          onClick={() =>
            paginate(
              indexOfLastEvent < events.length ? currentPage + 1 : currentPage
            )
          }
          disabled={indexOfLastEvent >= events.length}
          className="nav-button next-button"
        >
          Suiv →
        </button>
      </div>

    
    </div>

  );
};

export default Events;