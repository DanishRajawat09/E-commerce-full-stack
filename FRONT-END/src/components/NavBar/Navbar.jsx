import "./navbar.css";
import { isOpen } from "../../features/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../api/handleAPi";
import { clearUserData } from "../../features/userDetailSlice";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";

const Navbar = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const useScrollLock = (lock = false) => {
    useEffect(() => {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      if (lock) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "relative";
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        // Mobile fixes
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.position = "relative";
      } else {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.paddingRight = "";

        document.documentElement.style.overflow = "";
        document.documentElement.style.position = "";
      }

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.paddingRight = "";

        document.documentElement.style.overflow = "";
        document.documentElement.style.position = "";
      };
    }, [lock]);
  };

  useScrollLock(open);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={`${userData.profile?.profilePicture || "/broken-image.svg"}`}
                    ></Avatar>
                  </IconButton>
                </Tooltip>
              </Box>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {userData.email ? (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        handleClose(), handleLogOut();
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <Link to={"/user/login"} className="LoginNavBarLink">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Login fontSize="small" />
                        </ListItemIcon>
                        LogIn
                      </MenuItem>
                    </Link>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
