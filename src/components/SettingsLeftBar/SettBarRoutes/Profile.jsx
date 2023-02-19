import React, { useEffect } from "react";
import Home from "../../HomePage/Home";
import AccSettBar from "../AccSettBar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  Profile: {
    display: "flex",
    flexDirection: "row",
  },
  leftBar: {
    width: "30vh",
  },
});

function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.Profile}>
      <div className={classes.leftBar}>
        <AccSettBar />
      </div>
      <div className={classes.rightBar}></div>
    </div>
  );
}

export default Profile;
