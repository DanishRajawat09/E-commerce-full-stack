import "./sideNav.css";
import { useDispatch } from "react-redux";
import { isOpen } from "../../features/stateSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import CircularProgress from "@mui/material/CircularProgress";
import { logOut } from "../../api/handleAPi";
import { useMutation } from "@tanstack/react-query";
import { clearUserData } from "../../features/userDetailSlice";
const SideNavBar = () => {
  const { open } = useSelector((state) => state.sideBarState);
  const dispatch = useDispatch();
  const handleCloseSideBar = () => {
    dispatch(isOpen({ open: false }));
  };
  const userData = useSelector((state) => state.userDetail);

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (open) {
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
  }, [open]);

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

  const handleLogOut = (role) => {
    console.log(role);

    logoutMutation.mutate(role);
  };

  return (
    <>
      <div className={open ? "sideNav" : "discard"}>
        <div className="topArea">
          <Avatar
            sx={{ width: "60px", height: "60px" }}
            src={
              (userData.isVerified && userData.profile?.avatar) ||
              "/broken-image.svg"
            }
          ></Avatar>
          <Typography id="sideNavTitle">
            {(userData.isVerified && userData.profile?.fullName) ||
              "No Account"}
          </Typography>
          {userData.isVerified && (
            <Typography id="sideNavSubHeading">{userData.email}</Typography>
          )}
        </div>
        {!userData.isVerified && (
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
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <nav aria-label="main mailbox folders">
              <List>
                <Link to={"/"} className="sideNavBarLink">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <HomeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={"/shop"} className="sideNavBarLink">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <StoreOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={"/shop"} className="sideNavBarLink">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <SearchOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Search" />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
              <List>
                {userData.isVerified && (
                  <Link to={"/profileSetting"} className="sideNavBarLink">
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon sx={{ minWidth: "30px" }}>
                          <Person4OutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                )}
                {userData.isVerified && (
                  <Button
                    sx={{ width: "100%", backgroundColor: "black" }}
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      handleLogOut("user");
                    }}
                  >
                    LogOut
                  </Button>
                )}
              </List>
            </nav>
          </Box>
        </div>
      </div>
      {open && (
        <div className="screen" onClick={handleCloseSideBar}>
          {" "}
        </div>
      )}
    </>
  );
};

export default SideNavBar;
