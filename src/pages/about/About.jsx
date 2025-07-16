import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import ContactAbout from '../../containers/contactabout/Contactabout'
import Discover from '../../containers/discover/Discover'
import Info from '../../containers/info/Info'
import Pp from '../../containers/pp/Pp'

const About = () => {
  return (
    <div>
      <Navbar />
      <ContactAbout />
      <Discover />
      <Info />
      <Pp  />
      <Footer />
    </div>
  )
}

export default About