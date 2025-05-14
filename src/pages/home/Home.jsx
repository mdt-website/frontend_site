import React from 'react'
import SpeciHead from '../../containers/speciHead/SpeciHead';
import NextCulte from '../../containers/nextCulte/NextCulte';
import Events from '../../containers/events/Events';
import PastorMessage from '../../containers/pastorMassage/PastorMessage'
import Library from '../../components/library/Library';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div className="mdt__home ">
      <SpeciHead />
      <NextCulte />
      <Events />
      <PastorMessage />
      <Library />
      <Footer />
      
    </div>
  )
}

export default Home