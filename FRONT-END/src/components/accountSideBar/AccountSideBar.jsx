/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import "./accountSideBar.css";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { closeAccountBar } from "../../features/accountBarSlice";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import { useEffect } from "react";
const AccountSideBar = ({ isLoggedIn, user }) => {
  const { isOpenAccountBar } = useSelector((state) => state.accountBarSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpenAccountBar) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Mobile fixes
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "relative";
      console.log(document.body);
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
  }, [isOpenAccountBar]);

  return (
    <>
      <div className={isOpenAccountBar ? "accountNav" : "discard"}>
        <div className="accountHeading">
          <Avatar
            sx={{ width: "110px", height: "110px" }}
            src={isLoggedIn ? user?.profile?.avatar?.url : "/broken-image.svg"}
          ></Avatar>
          <div className="accountHeadingText">
            <Typography id="sideNavTitle">
              {isLoggedIn ? user?.profile?.fullName : "No Account"}
            </Typography>
            {isLoggedIn && (
              <Typography
                sx={{ textAlign: "center", color: "var(--subTextCrl)" }}
                id="sideNavSubHeading"
              >
                {user.email}
              </Typography>
            )}
          </div>
        </div>
        {!isLoggedIn && (
          <Link to={"/user/login"}>
            <Button
              sx={{ width: "100%", backgroundColor: "black" }}
              variant="contained"
              disableElevation
            >
              LogIn
            </Button>
          </Link>
        )}
        <Divider />
        <div className="navArea">
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
            }}
          >
            <nav aria-label="main mailbox folders">
              <List>
                <Link to={"/shop"} className="sideNavBarLink">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <StorefrontOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Orders" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={"/shop"} className="sideNavBarLink">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <ApartmentOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Address" />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
              <List>
                <Link to={"/"} className="sideNavBarLink">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <AccountBoxOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Edit Profile" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={"/shop"} className="sideNavBarLink">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <EmailOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Change Email" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={"/shop"} className="sideNavBarLink">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <PhoneEnabledOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Change Contact" />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </nav>
          </Box>
        </div>
      </div>
      {isOpenAccountBar && (
        <div
          className={
            isOpenAccountBar
              ? "account-nav-bar-screen"
              : "account-nav-bar-no-screen"
          }
          onClick={() => {
            dispatch(closeAccountBar()), console.log(isOpenAccountBar);
          }}
        >
          {" "}
        </div>
      )}
    </>
  );
};

export default AccountSideBar;
