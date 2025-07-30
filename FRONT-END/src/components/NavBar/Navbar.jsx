/* eslint-disable react/prop-types */
import "./navbar.css";
import { isOpen } from "../../features/stateSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../api/handleAPi";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Navbar = ({ user, isLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    data: {},
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = showSuccess;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleCloseSuccess = () =>
    setShowSuccess({ ...showSuccess, open: false });
  useEffect(() => {
    if (showSuccess.open === true) {
      const successInterval = setInterval(() => {
        setShowSuccess({ ...showSuccess, open: false });
      }, 5000);

      return () => {
        clearInterval(successInterval);
      };
    }
  });

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

  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: (role) =>
      logOut(role === "admin" ? "/api/v1/admin/logout" : "/api/v1/user/logout"),
    onSuccess: async (data) => {
      console.log(data);
       queryClient.setQueryData(["me"], null); 
      queryClient.removeQueries(["me"]);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSideNav = () => {
    dispatch(isOpen({ open: true }));
  };

  const handleLogOut = (role) => {
    console.log(role);

    logoutMutation.mutate(role);
  };

  return (
    <header className="navHeader">
      {showSuccess.open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={showSuccess.open}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          key={"success" + vertical + horizontal}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {apiData.message}
          </Alert>
        </Snackbar>
      )}

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
                      src={
                        isLoggedIn
                          ? user?.profile?.avatar?.url
                          : "/broken-image.svg"
                      }
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
                {isLoggedIn ? (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Avatar src={user.profile?.avatar?.url} /> My account
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
