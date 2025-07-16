import React from 'react';
import './pastoralMember.css';
import image1 from '../../assets/event1.jpg';
import image2 from '../../assets/Mum2.jpg';
import ap1 from '../../assets/ap1.jpg';
import ap2 from '../../assets/ap2.jpg';
import ma1 from '../../assets/ma1.jpg';
import ma2 from '../../assets/ma2.jpg';

const PastoralMember = () => {
  const members = [
    {
      role: "ASSISTANT PASTEUR",
      name: "Audrey MELE",
      image1: image1, 
      image2: image2,
      description: `Lorem ipsum dolor sit amet. Quo atque atque qui quia 
      rerum est obcaccati liaque aut rerum placent quo fuga 
      quisquam eum Quis deleniti in corrupti voluptatem?
      Lorem ipsum dolor sit amet. Quo atque atque qui quia 
      rerum est obcaccati liaque aut rerum placent quo fuga 
      quisquam eum Quis deleniti in corrupti voluptatem?`,
      align: "right" // Nouveau champ pour spécifier l'alignement
    },
    {
      role: "ASSISTANT PASTEUR",
      name: "Guy-Valery OGOUTCHI",
      image1: ap1,
      image2: ap2,
      description: `Lorem ipsum dolor sit amet. Quo atque atque qui quia 
      rerum est obcaccati liaque aut rerum placent quo fuga 
      quisquam eum Quis deleniti in corrupti voluptatem?
      Lorem ipsum dolor sit amet. Quo atque atque qui quia 
      rerum est obcaccati liaque aut rerum placent quo fuga 
      quisquam eum Quis deleniti in corrupti voluptatem?`,
      align: "left"
    },
    {
      role: "ASSISTANT PASTEUR",
      name: "Mariama ABOLADE",
      image1: ma1,
      image2: ma2,
      description: `Lorem ipsum dolor sit amet. Quo atque atque qui quia 
      rerum est obcaccati liaque aut rerum placent quo fuga 
      quisquam eum Quis deleniti in corrupti voluptatem?
      Lorem ipsum dolor sit amet. Quo atque atque qui quia 
      rerum est obcaccati liaque aut rerum placent quo fuga 
      quisquam eum Quis deleniti in corrupti voluptatem?`,
      align: "right"
    }
  ];

  return (
    <section className="pastoralMember-section">
      <h1 className="pastoralMember-title">LES MEMBRES DU CORPS PASTORAL</h1>

      <div className="pastoralMember-container">
        {members.map((member, index) => (
          <div key={index} className={`pastoralMember-card ${member.align === 'left' ? 'image-left' : 'image-right'}`}>
            <div className="pastoralMember-content">
              <div className="pastoralMember-image-container">
                <img src={member.image1} alt={member.name} className="pastoralMember-img-main" />
                <img src={member.image2} alt={member.name} className="pastoralMember-img-thumbnail" />
              </div>
              
              <div className="pastoralMember-text">
                <div className="pastoralMember-header">
                  <h3 className="pastoralMember-role">{member.role}</h3>
                  <h2 className="pastoralMember-name">{member.name}</h2>
                </div>
                <div className="pastoralMember-description">
                  <p>{member.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PastoralMember;