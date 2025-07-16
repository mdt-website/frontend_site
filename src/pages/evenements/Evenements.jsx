import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Evhead from '../../containers/evhead/Evhead'
import EventAnnuel from '../../containers/eventAnnuel/EventAnnuel'


const Evenements = () => {
  return (
    <div>
      <Navbar />
      <Evhead />
      <EventAnnuel />
      <Footer />
    </div>
  )
}

export default Evenements