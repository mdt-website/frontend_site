import React from "react";
import "./pp.css";
import mainImg from "../../assets/pasteur1.jpg"; 
import img1 from "../../assets/gallery1.jpg";
import img2 from "../../assets/gallery5.jpg";
import { useNavigate } from 'react-router-dom';

const Pp = () => {
  const navigate = useNavigate();
  return (
    <section className="pp-section">
        <p className="pp-titlespeci">LE CORPS PASTORAL</p>
      <div className="pp-content">
        <div className="pp-text">
          <p className="pp-subtitle">LE PASTEUR PRINCIPAL</p>
          <h2 className="pp-title">Héribert Donald MELE</h2>
          <p className="pp-description">
            Lorem ipsum dolor sit amet. Quo atque atque qui quia rerum est
            obcaecati itaque aut rerum placeat quo fuga quisquam eum Quis
            deleniti in corrupti voluptatem? Qui quisquam tempora et doloremque
            doloremque quo tenetur numquam.
            <br /><br />
            Est autem vero hic obcaecati voluptas sed nobis aliquid est eveniet
            eaque ut voluptates asperiores sed ipsa explicabo est neque fugiat
            id excepturi minus et error culpa in repudiandae omnis ut recusandae
            accusantium? Quo sit sapiente est neque delectus et assumenda modi?
            <br /><br />
            Aut tempore quidem qui iste velit sit animi quaerat et voluptatibus
            debitis est molestiae harum. Id assumenda accusantium aut delectus
            alias et adipisci totam ut voluptates eligendi!
          </p>
        </div>

        <div className="pp-images">
          <img src={mainImg} alt="Pasteur principal" className="main-image" />
          <img src={img1} alt="Image 1" className="img-1" />
          <img src={img2} alt="Image 2" className="img-2" />
        </div>
        <button className="pp-button"  onClick={() => navigate('/detailpastoral')}>Découvrir le conseil pastoral →</button>
      </div>
    </section>
  );
};

export default Pp;
