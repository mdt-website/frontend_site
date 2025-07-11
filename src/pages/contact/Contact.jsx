import React from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import ContactHead from '../../containers/contacthead/ContactHead';
import Whous from '../../containers/whous/Whous';
import Library from '../../components/library/Library';
import Map from '../../containers/map/Map';
import InterweekGram from '../../containers/interweekGram/InterweekGram';



const Contact = () => {
  return (
    <div>
      <Navbar />
      <ContactHead />
      <Whous />
      <Map />
      <InterweekGram />
      <Library showGallery={false} /> {/* Galerie désactivée */}
      <Footer />
    </div>
  );
};

export default Contact;
