import "./navbar.css";
import { Avatar } from "@mui/material";
import { isOpen } from "../../features/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../api/handleAPi";
import { clearUserData } from "../../features/userDetailSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail);
const [options , setOptions] = useState(false)

useEffect(() => {
  if (options) {
    document.body.style.overflow = "hidden"
  }else{
    document.body.style.overflow = "auto"
  }

  return () => {
    document.body.style.overflow = "auto"
  }
  
},[options]
)

  const logoutMutation = useMutation({
    mutationFn: (role) =>
      logOut(role === "admin" ? "/api/v1/admin/logout" : "/api/v1/user/logout"),
    onSuccess: (data) => {
      console.log(data);
      dispatch(clearUserData());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleSideNav = () => {
    dispatch(isOpen({ open: true }));
  };

  const handleLogOut = (role) => {
    console.log(role);

    logoutMutation.mutate(role);
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
              <Avatar onClick={() => { setOptions(true) }} sx={{ width: 30, height: 30 }} src="/broken-image.svg" />
           {options ? (
            <>
               <div className="screen"  onClick={() => { setOptions(false) }}></div>
              <div className="manu">
                <div className="manuItems manuItemProfile" onClick={() => { setOptions(false) }}>Profile</div>
                <div className="manuItems manuItemAccount" onClick={() => { setOptions(false) }}>My Account</div>
                <div className="manuItems manuItemLogout " onClick={() => { setOptions(false) }}>LogOut</div>
              </div>
            </>
           ) : (
            <>
    
            </>
           )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
