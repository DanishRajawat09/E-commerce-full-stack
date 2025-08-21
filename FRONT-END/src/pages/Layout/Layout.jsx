import { Outlet } from 'react-router-dom'
import Navbar from '../../components/NavBar/Navbar'
import SideNavBar from '../../components/NavBar/SideNavBar'
import FooterArea from '../../components/FooterArea/FooterArea'
import useCheckUserLogin from '../../utils/VerifyUserLogin'
import useAutoCloseSidebar from '../../utils/closeSideBar'
import AccountSideBar from '../../components/accountSideBar/AccountSideBar'

const Layout = () => {
  const {isLoggedIn , userData} = useCheckUserLogin()
  useAutoCloseSidebar()
console.log(userData);

  return (
    <>
    <SideNavBar isLoggedIn={isLoggedIn} user={userData}/>
    <AccountSideBar  isLoggedIn={isLoggedIn} user={userData}/>
    <Navbar isLoggedIn={isLoggedIn} user={userData}/>
      <Outlet/>
      <FooterArea/>
    </>
  )
}

export default Layout
