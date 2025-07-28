import React from 'react'
import { Outlet } from 'react-router-dom'
// import Navbar from '../../components/NavBar/Navbar'
// import SideNavBar from '../../components/NavBar/SideNavBar'
import FooterArea from '../../components/FooterArea/FooterArea'

const Layout = () => {
  return (
    <>
    {/* <SideNavBar/> */}
    {/* <Navbar/> */}
      <Outlet/>
      <FooterArea/>
    </>
  )
}

export default Layout
