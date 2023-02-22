import React, { useEffect } from "react";
import Home from "../../HomePage/Home";
import AccSettBar from "../AccSettBar";
import { makeStyles } from "@mui/styles";
import FullScreenDialog from "../../Search/SearchDialog";

const useStyles = makeStyles({
  Profile: {
    display: "flex",
    flexDirection: "row",
  },
  leftBar: {
    width: "30vh",
  },
});

function Profile({
  open,
  handleClose,
  key,
  openHome,
  handleSignUpClose,
  handleSignUpClickOpen,
  handleSignInClickOpen,
  handleSignInClose,
}) {
  const classes = useStyles();

  return (
    <div className={classes.Profile}>
      <div className={classes.leftBar}>
        <AccSettBar />
      </div>
      <FullScreenDialog
        handleClose={handleClose}
        open={open}
        openHome={openHome}
        handleSignUpClose={handleSignUpClose}
        handleSignUpClickOpen={handleSignUpClickOpen}
        handleSignInClickOpen={handleSignInClickOpen}
        handleSignInClose={handleSignInClose}
      />
      <div className={classes.rightBar}></div>
    </div>
  );
}

export default Profile;
