import React, { useState } from "react";
import PrimaryButton from "../Button/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { createUseStyles } from "react-jss";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selector";
import { setUser } from "../../redux/user/actions";
import {
  addBasket,
  addFavorite,
  addUsersFirebase,
  db,
} from "../../config/Config";
import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = createUseStyles({
  signUpDialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "25px",
  },
  signUpContent: {
    width: "400px",
    height: "400px",
    backgroundColor: "#3a3333",
    opacity: 0.8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  signUpDialogActions: {
    backgroundColor: "#3a3333",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",

    opacity: 0.8,
  },
  PrimaryButton: {
    color: "white",
    width: "100px",
    fontSize: "18px",
    "&:hover": {
      marginTop: 0,
      backgroundColor: "rgb(200,200,200)",
      color: "black",
    },
  },
  signUpInputs: {
    flex: 0.7,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  signUpInput: {
    borderRadius: "25px",
    border: "none",
    width: "200px",
    height: "40px",
    padding: "10px",
  },
  error: { color: "#ff0000" },
  span: { color: "#302d2b" },
  link: {
    marginLeft: 10,
    listStyleType: "none",
    color: "#302d2b",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#9a9999",
    },
  },
});

function SignUpDialog({ open, handleClose }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const classes = useStyles();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        let current = { userName };
        setDoc(doc(db, "SignedUpUsers", auth.user.uid), {
          userName,
          email,
          password,
          fistName: "",
          lastName: "",
          phone: "",
          url: "",
        });
        dispatch(setUser({ ...current, email: auth.user.email }));
        addBasket(email);
        addFavorite(email);
        handleClose();
      })
      .catch((error) => setError("Invalid email or password"));
  };
  console.log(currentUser, "dddddd");
  return (
    <Dialog
      className={classes.Dialog}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={classes.signUpDialog}>
        <DialogContent className={classes.signUpContent}>
          <h4 style={{ color: "white" }}>Sign Up</h4>
          <div className={classes.signUpInputs}>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Username"
              className={classes.signUpInput}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className={classes.signUpInput}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className={classes.signUpInput}
            />
          </div>
        </DialogContent>

        <div className={classes.error}>{error}</div>
        <DialogActions className={classes.signUpDialogActions}>
          <div>
            <PrimaryButton
              onClick={onSignUp}
              className={classes.PrimaryButton}
              variant="text"
            >
              Sign Up
            </PrimaryButton>
          </div>
        </DialogActions>
        <div>
          <span className={classes.span}>
            Already have an account?
            <Link className={classes.link} to="/signin" onClick={handleClose}>
              Sign in.
            </Link>
          </span>
        </div>
      </div>
    </Dialog>
  );
}
export default SignUpDialog;
