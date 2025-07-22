import "./navbar.css";

import { isOpen } from "../../features/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useMutation} from "@tanstack/react-query";
import {logOut } from "../../api/handleAPi";
import { clearUserData } from "../../features/userDetailSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail);

const logoutMutation = useMutation({
  mutationFn : (role) => logOut(role === "admin" ? "/api/v1/admin/logout" : "/api/v1/user/logout"),
  onSuccess : (data) => {
    console.log(data);
    dispatch(clearUserData())
  },
  onError : (error) => {
    console.log(error);
    
  }
  

  
  
})

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleSideNav = () => {
    dispatch(isOpen({ open: true }));
  };

  const handleLogOut = (role) => {
    console.log(role);
    
    logoutMutation.mutate(role)
  }
  

  return (
    <header className="navHeader">
      <div className="container  ">
        <div className="flexContainer navData">
          <div className="navLogo flexContainer">
            <img
              className="menuBar"
              src="burger.png"
              alt="menuBar"
              onClick={handleSideNav}
            />
            <h1 className="icon">shop.co</h1>
          </div>
          <nav className="navigation">
            <ul className="flexContainer">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `shop ${isActive && `navTextColor`}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/shop"}
                  className={({ isActive }) =>
                    `shop ${isActive && `navTextColor`}`
                  }
                >
                  Products
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="searchBar">
            <div className="userInput flexContainer">
              <img src="Search.png" alt="searchIcon" />
              <input
                type="text"
                className="searchInput"
                placeholder="Search for Products..."
              />
            </div>
          </div>
          <div className="cartIdIcon">
            <img className="searchIcon" src="search2.png" alt="searchIcon" />
            <NavLink to={"/cart"}>
              <img src="cart.png" alt="CartIcon" />
            </NavLink>
            <div className="loginZone">
              <img src="id.png" alt="IdIcon" />
              <div className="loginRoutes">
                <Link to={"/user/login"} className="logInUserLink">
                  Log In
                </Link>
                <Link to={"/admin/login"} className="logInAdminLink">
                  Admin Zone
                </Link>
                {"email" in userData.userData ?   (
                  <>
                    <button onClick={() => handleLogOut("user")} className="logInAdminLink">logout User</button>
                    <button onClick={() => handleLogOut("admin")} className="logInAdminLink">logout Admin</button>
                  </>
                ) : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
