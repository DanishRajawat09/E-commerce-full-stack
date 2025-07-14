import React, { useState } from "react";
import "./navbar.css";
import Headline from "./Headline";
import SideNavBar from "./SideNavBar";
import { isOpen } from "../../features/stateSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();

  const handleSideNav = () => {
    dispatch(isOpen({ open: true }));
  };

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
                <Link to={"/userlogin"} className="logInUserLink">
                  Log In
                </Link>
                <Link to={"/adminlogin"} className="logInAdminLink">
                  Admin Zone
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
