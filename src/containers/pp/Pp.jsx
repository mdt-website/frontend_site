import React from 'react';
import './pp.css';
import pastorale from '../../assets/pasteur1.jpg'; // Image du corps pastoral
import principal from '../../assets/gallery1.jpg'; // Image principale du pasteur
import secondaire from '../../assets/gallery5.jpg'; // Image secondaire

const Pp = () => {
  return (
    <div className="pp-container">
      {/* Section Corps Pastoral */}
      <div className="pp-section">
        <div className="pp-image-group">
          <img src={pastorale} alt="Corps pastoral" className="pp-main-image" />
        </div>
        <div className="pp-text-content">
          <h2>LE CORPS PASTORAL</h2>
          <div className="pp-text">
            {/* Texte du corps pastoral ici */}
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          </div>
        </div>
      </div>

      {/* Section Pasteur Principal */}
      <div className="pp-section pp-principal">
        <div className="pp-image-group">
          <img src={principal} alt="Pasteur principal" className="pp-main-image" />
          <div className="pp-secondary-images">
            <img src={secondaire} alt="Pasteur en conférence" className="pp-secondary-image" />          </div>
        </div>
        <div className="pp-text-content">
          <h2>LE PASTEUR PRINCIPAL</h2>
          <h3>Heribert Donald MELE</h3>
          <div className="pp-text">
            <p>Lorem ipsum dolor sit amet. Quo atque atque qui duia</p>
            <p>retum est obcisecati faque aut retum placerit quo fuga</p>
            <p>Lorem ipsum dolor sit amet. Quo atque atque qui duia</p>
            <p>retum est obcisecati faque aut retum placerit quo fuga</p>
            <p>quisquam eum Quis deleniti in corrupti voluptatem?</p>
            <br />
            <p>Qui galiam tempora et doloremque dolorumque quo</p>
            <p>terciant numaunt.</p>
            <br />
            <p>Est autem vero llic obcisecati voluptas sed nobis aliquid</p>
            <p>est evenbit sequa et voluptates asperiores sed ipsa</p>
            <p>explicabo est neque fugai id exceputin minus et error</p>
            <p>culpin in reparlaturale omnia ut accusandae</p>
            <p>Assistantium? Quo sirtu asperiore est neque dislectus et</p>
            <p>assumerida modi?</p>
            <br />
            <p>Aut tempore quiderm qui iste velit sit animi quasent et</p>
            <p>volugatibus debatis est molestiae harum, id assumenda</p>
            <p>veteransiurim aris deleteris abias et dulitem totatum</p>
            <p>volugicas eligendi! Es perfeerocia placerit sed nostrum</p>
            <p>mollitia cum Quis Quis.</p>
            {/* ... reste du texte exact ... */}
          </div>
          <button className="pp-button">
            Découvrir le conseil pastoral
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pp;

