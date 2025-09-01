import Navbar from "../components/Navbar/Navbar";
import FooterArea from "../components/FooterArea/FooterArea"
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <FooterArea />
    </>
  );
};

export default MainLayout;
