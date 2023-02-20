import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth, storage } from "../../config/Config";
import { setUser } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { selectUser } from "../../redux/user/selector";
import { getAuth, updateProfile } from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const theme = createTheme({
  palette: {
    primary: {
      light: "#BCAAA4",
      main: "#8D6E63",
      dark: "#795548",
      contrastText: "#fff",
    },
  },
});
const useStyles = makeStyles({
  accSettBar: {
    backgroundColor: "#3A3333",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "300px",
    marginLeft: "0px",
  },
  homeIcon: {},
  barList: {
    margin: 0,
    padding: 0,
    flex: 3,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    color: "white",
  },
  barListItem: {
    borderBottom: "1px solid black",
    height: "7vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "rgb(230,230,230)",
      color: "#1A1111",
    },
    "& span": {
      paddingLeft: 15,
    },
  },
  header: {
    flex: 1,
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: "300px",
  },
  avatar: {
    height: "200px",
    width: "200px",
  },
  userInfo: { justifyItems: "start" },
  active: {
    backgroundColor: "rgb(230,230,230)",
    color: "#1A1111",
    borderBottom: "1px solid black",
    height: "7vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
  },
  aloadedImg: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  accImage: {
    height: "200x",
    width: "200px",
  },
  leftBarItem: {
    cursor: "pointer",
  },
});
function AccSettBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const auth = getAuth();
  const handelEditProfileClick = () => {
    navigate("/editprofile");
  };
  const handelLogOutClick = (e) => {
    e.preventDefault();
    auth.signOut();
    dispatch(setUser({}));
    return navigate("/");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.accSettBar}>
          <div className={classes.header}>
            <Avatar
              sx={{ bgcolor: deepOrange[500], height: 150, width: 150 }}
              variant="square"
              className={classes.avatar}
            >
              {currentUser.url ? (
                <img
                  src={currentUser.url}
                  alt="profile Picture"
                  className={classes.accImage}
                ></img>
              ) : (
                <AccountCircleOutlined className={classes.accImage} />
              )}
            </Avatar>
            <div className={classes.userInfo}>
              {currentUser?.firstName ? (
                <h3>{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
              ) : (
                <h3>User name</h3>
              )}
              <h5>{`email: ${currentUser.email}`}</h5>
              {currentUser?.phone ? (
                <h5>{`phone: ${currentUser.phone}`}</h5>
              ) : (
                <></>
              )}
              {currentUser?.address ? (
                <h5>{`address: ${currentUser.address}`}</h5>
              ) : (
                <></>
              )}
            </div>
          </div>
          <ul className={classes.barList}>
            <li className={classes.barListItem}>
              <AddBusinessIcon className={classes.leftBarItem} />
              <span> Add product </span>
            </li>
            <li className={classes.barListItem}>
              <PermIdentityIcon className={classes.leftBarItem} />
              <span onClick={handelEditProfileClick}> Edit profile</span>
            </li>
            <li className={classes.barListItem}>
              <LogoutIcon className={classes.leftBarItem} />
              <span onClick={handelLogOutClick}> LogOut</span>
            </li>
          </ul>
        </div>
      </ThemeProvider>
    </>
  );
}
export default AccSettBar;
