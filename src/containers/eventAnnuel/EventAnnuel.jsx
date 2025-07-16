import React, { useState, useEffect } from "react";
import "./eventAnnuel.css";
import event1 from "../../assets/event1.jpg";
import { FiCalendar, FiMapPin, FiInfo } from "react-icons/fi";

const events = [
  {
    id: 1,
    title: "Conférence Internationale Métamorphose (CIME)",
    tag: "Bientôt dans",
    targetDate: new Date(2025, 9, 29), // 29 Octobre 2025
    location: "Paris, France",
    description: "Conférence internationale transformatrice pour leaders et entrepreneurs.",
    image: event1,
    status: "upcoming",
    type: "Conférence",
    featured: true
  },
  {
    id: 2,
    title: "Nuit de la Traversée",
    tag: "Bientôt",
    date: "31 Décembre 2025",
    location: "Lyon, France",
    description: "Une nuit mémorable de transition spirituelle.",
    image: event1,
    status: "upcoming",
    type: "Spiritualité"
  },
  {
    id: 3,
    title: "Célébration des Innovateurs",
    tag: "Terminé",
    date: "15 Novembre 2023",
    location: "Abidjan, Côte d'Ivoire",
    description: "Célébration des innovations technologiques et sociales.",
    image: event1,
    status: "past",
    type: "Innovation"
  },
  {
    id: 4,
    title: "Forum des Femmes Entrepreneures",
    tag: "En cours",
    date: "10 Janvier 2024",
    location: "Lomé, Togo",
    description: "Espace d'échange pour les femmes en business.",
    image: event1,
    status: "ongoing",
    type: "Femme"
  },
  {
    id: 5,
    title: "Forum des Femmes Entrepreneures",
    tag: "En cours",
    date: "10 Janvier 2024",
    location: "Lomé, Togo",
    description: "Espace d'échange pour les femmes en business.",
    image: event1,
    status: "ongoing",
    type: "Femme"
  },
  {
    id: 6,
    title: "Conférence Internationale Métamorphose (CIME)",
    tag: "Bientôt dans",
    targetDate: new Date(2025, 9, 29), // 29 Octobre 2025
    location: "Paris, France",
    description: "Conférence internationale transformatrice pour leaders et entrepreneurs.",
    image: event1,
    status: "upcoming",
    type: "Conférence",
    featured: true
  }
];

const EventAnnuel = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [countdown, setCountdown] = useState({
    months: 0,
    days: 0,
    displayText: "Calcul en cours..."
  });

  useEffect(() => {
    const featuredEvent = events.find(event => event.featured);
    if (!featuredEvent) return;

    const calculateTimeLeft = () => {
      const today = new Date();
      const targetDate = featuredEvent.targetDate;
      
      if (today >= targetDate) {
        return {
          months: 0,
          days: 0,
          displayText: "Événement terminé"
        };
      }

      let years = targetDate.getFullYear() - today.getFullYear();
      let months = targetDate.getMonth() - today.getMonth();
      let days = targetDate.getDate() - today.getDate();

      if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
      }

      if (days < 0) {
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        ).getDate();
        days = lastDayOfMonth - today.getDate() + targetDate.getDate();
        months--;
      }

      months += years * 12;

      return {
        months: months,
        days: days,
        displayText: `Mois ${String(months).padStart(2, '0')}/2025 (HON) Jours ${String(months).padStart(2, '0')} | ${String(days).padStart(2, '0')}`
      };
    };

    const updateCountdown = () => {
      const timeLeft = calculateTimeLeft();
      setCountdown({
        months: timeLeft.months,
        days: timeLeft.days,
        displayText: timeLeft.displayText
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 86400000);

    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return '#2a9d8f';
      case 'ongoing': return '#457b9d';
      case 'past': return '#e63946';
      default: return '#2a9d8f';
    }
  };

  return (
    <section className="eventhead-section">
      <div className="eventhead-header">
        <h2 className="eventhead-main-title">Nos rendez-vous annuels</h2>
        <p className="eventhead-subtitle">
            Des moments uniques, que le Seigneur nous fait la grâce de vivre dans le corps du Christ
        </p>
      </div>

      <div className="eventhead-grid">
        {events.map((event) => (
          <div 
            className={`eventhead-card ${expandedCard === event.id ? 'eventhead-expanded' : ''} ${event.featured ? 'eventhead-featured' : ''}`} 
            key={event.id}
            onClick={() => !event.featured && toggleExpand(event.id)}
          >
            <img src={event.image} alt={event.title} className="eventhead-img" />
            
            <div className="eventhead-content-overlay">
              {event.featured ? (
                <>
                  <div className="eventhead-featured-header">
                    <div className="eventhead-countdown-box">
                      <span className="eventhead-countdown-title">{event.tag} →</span>
                      <span className="eventhead-countdown-days">{countdown.months} | {countdown.days}</span>
                      <span className="eventhead-countdown-time">{countdown.displayText}</span>
                    </div>
                    <div className="eventhead-featured-type">{event.type}</div>
                  </div>
                  
                  <div className="eventhead-featured-info">
                    <h3>{event.title}</h3>
                    <div className="eventhead-featured-date">
                      © {event.targetDate.toLocaleDateString('fr-FR', { 
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="eventhead-card-header">
                    <span 
                      className="eventhead-status" 
                      style={{ backgroundColor: getStatusColor(event.status) }}
                    >
                      {event.tag}
                    </span>
                    <span className="eventhead-type">{event.type}</span>
                  </div>
                  
                  <div className="eventhead-info">
                    <h3>{event.title}</h3>
                    <div className="eventhead-meta">
                      <span><FiCalendar /> {event.date}</span>
                      {expandedCard === event.id && (
                        <span><FiMapPin /> {event.location}</span>
                      )}
                    </div>
                    
                    {expandedCard === event.id && (
                      <div className="eventhead-details">
                        <p><FiInfo /> {event.description}</p>
                        <button className="eventhead-button">Voir plus</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventAnnuel;