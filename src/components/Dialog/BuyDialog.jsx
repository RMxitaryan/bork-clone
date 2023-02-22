import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import PrimaryButton from "../Button/Button";
import { createUseStyles } from "react-jss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = createUseStyles({
  dialog: {
    backgroundColor: "#3a3333",
    color: "rgb(230,230,230)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  text: {
    color: "rgb(230,230,230)",
  },
});

export default function BuyDialog({ handleYes, handleClose, open, children }) {
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.dialog}>
          <DialogTitle>{"Delete all favorite items"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <p className={classes.text}>{children}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <PrimaryButton onClick={handleClose}>Cancel</PrimaryButton>
            <PrimaryButton onClick={handleYes}>Yes</PrimaryButton>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
