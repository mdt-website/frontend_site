import React from 'react';
import './detailhead.css';
import detailBg from '../../assets/image.jpg'; // Remplacez par votre image

const DetailHead = () => {
  return (
    <div className="detail-container">
      <div className="detail-image">
        <img src={detailBg} alt="Conseil Pastoral" />
      </div>
      <h1 className="detail-title">Le conseil Pastoral</h1>
    </div>
  );
};

export default DetailHead;