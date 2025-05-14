import React from "react";
import pastorImage from "../../assets/PastorImage.jpg"; // Importez l'image du pasteur
import "./pastorMessage.css";

const PastorMessage = () => {
  return (
    <div className="pastor-container">
      {/* Section Titre et Sous-titre */}
      <div className="pastor-header">
        <h1 className="pastor-title">Le prix de l'obéissance</h1>
        <p className="pastor-subtitle">Le pasteur Principal des églises MDT</p>
      </div>

      {/* Section Citation Biblique */}
      <blockquote className="pastor-quote section__padding">
        <p className="quote-text ">
          Que personne ne méprise ta jeunesse. Sois un modèle pour les fidèles, en parole, 
          en conduite, en charité, en foi, en pureté.
        </p>
        <p className="bible-verse">1 Timothée 4:12-16</p>
      </blockquote>

      {/* Section Message avec Photo */}
      <div className="pastor-message-section section__margin">
        <div className="pastor-image-container">
          <img 
            src={pastorImage} 
            alt="Pasteur Herbert Donald" 
            className="pastor-image"
          />
        </div>
        
        <div className="message-content-wrapper">
          <h2 className="message-title">Mot du Pasteur</h2>
          <div className="message-content">
            <p>
              Bienvenue à La Maison de la Transformation, un lieu où le Seigneur œuvre 
              puissamment pour nous transformer à Son Image, de gloire en gloire. Chaque 
              dimanche, nous nous réunissons pour célébrer Sa présence, recevoir Sa Parole 
              et expérimenter Son amour transformateur. Que vous soyez à la recherche d'une 
              communauté spirituelle, d'une restauration personnelle ou simplement d'un 
              moment de communion avec Dieu, vous êtes les bienvenus ici.
            </p>
            <p>
              Notre désir est que chacun de vous puisse vivre une transformation profonde, 
              guidée par le Saint-Esprit. Rejoignez-nous pour des cultes dynamiques, des 
              enseignements inspirants et des moments de prière intenses. Ensemble, 
              avançons vers la destinée que Dieu a préparée pour nous.
            </p>
            <p className="blessing">Que Dieu vous bénisse abondamment,</p>
            <p className="signature-name">Pasteur Herbert Donald</p>
            <p className="hashtag">#LaMaisonDeLaTransformation</p>
            <p className="hashtag">#TransformationSpirituelle</p>
            <p className="hashtag">#AmourDeDieu</p>
            {/* Bouton Découvrir */}
            <div className="discover-button-container">
                <button className="discover-button">
                    Découvrir la vie de l'église →
                </button>
            </div>
        </div>

        </div>
      </div>
 
    </div>
  );
};

export default PastorMessage;