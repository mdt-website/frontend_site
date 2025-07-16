import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import DetailHead from '../../containers/detailHead/Detailhead'
import PastoralMember from '../../containers/pastoralMember/PastoralMember'


const Detailpastoral = () => {
  return (
    <div>
      <Navbar />
      <DetailHead  />
      <PastoralMember />
      <Footer />
    </div>
  )
}

export default Detailpastoral