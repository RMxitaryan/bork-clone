import { createUseStyles } from "react-jss";
import { Link, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../Button/Button";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selector";
import { auth } from "../../config/Config";
import { setUser } from "../../redux/user/actions";
import { useLocation } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const useStyles = createUseStyles({
  header: {
    backgroundColor: "#3A3330",
    width: "100%",
    height: 60,
    header: {},
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    marginLeft: "200px",
    color: "white",
    fontSize: 27,
  },
  headerTopRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // width: currentUser.email ? 100 : 250,
    marginRight: 12,
  },
  searchIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  headerTopLeft: { marginLeft: 15 },
  link: {
    textDecoration: "none",
  },
  signActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  under: {
    width: "100%",
    height: 1,
    backgroundColor: "#7C6F6F",
  },
  favoriteIcon: {
    color: "rgb(200,200,200)",
  },
});
function Navbar({
  handelClickMenuBar,
  setOpenHome,
  openHome,
  handleSignInClickOpen,
  handleSignUpClickOpen,
  handleSearchClickOpen,
}) {
  const classes = useStyles();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const email = auth.currentUser?.email;
    dispatch(setUser({ email: email }));
  }, []);
  const pathname = useLocation();
  const isSignIn =
    pathname.pathname === "/signin" || pathname.pathname === "/signup";
  return (
    <>
      <div className={isSignIn ? classes.signActive : classes.header}>
        {!isSignIn && (
          <div className={classes.headerTopLeft}>
            <img
              src="/img/menu.png"
              width={23}
              height={23}
              onClick={handelClickMenuBar}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        <div className={classes.name}>
          <Link to="/">
            <img
              src="/img/bork.jpg"
              onClick={() => {
                setOpenHome(true);
              }}
              width={100}
              height={25}
            />
          </Link>
        </div>
        <div
          className={classes.headerTopRight}
          style={{
            width: currentUser.email ? "100px" : "200px",
            marginLeft: currentUser.email && "8%",
          }}
        >
          {!isSignIn && (
            <img
              src="/img/search.png"
              width={23}
              height={23}
              className={classes.searchIcon}
              onClick={handleSearchClickOpen}
            />
          )}
          {currentUser.email ? (
            <>
              <Link to="favorite">
                <FavoriteBorderIcon className={classes.favoriteIcon} />
              </Link>
              <Link to="basket">
                <img src="/img/bag.png" width={23} height={23} />
              </Link>
              <ProfileIcon setOpenHome={setOpenHome} />
            </>
          ) : (
            !isSignIn && (
              <>
                <Link className={classes.link} to="signin">
                  <PrimaryButton>sign in</PrimaryButton>
                </Link>
                <Link className={classes.link} to="signup">
                  <PrimaryButton>sign up</PrimaryButton>
                </Link>
              </>
            )
          )}
        </div>
      </div>
      <div className={classes.under}></div>
      <Outlet />
    </>
  );
}
export default Navbar;
