import React, { useState } from "react";
import PrimaryButton from "../Button/Button";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { createUseStyles } from "react-jss";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selector";
import { setUser } from "../../redux/user/actions";
import { Link } from "react-router-dom";
import { auth } from "../../config/Config";

const useStyles = createUseStyles({
  signInDialog: {
    marginTop: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: "15px",
    borderStyle: "solid",
    borderColor: "rgb(46 40 38 / 80%)",
  },
  signInContent: {
    width: "400px",
    height: "400px",
    backgroundColor: "rgb(46 40 38 / 80%)",
    opacity: 0.8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  signInDialogActions: {
    backgroundColor: "rgb(46 40 38 / 80%)",
    width: "100%",
    opacity: 0.8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  signInInputs: {
    flex: 0.7,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  signInInput: {
    borderRadius: "25px",
    border: "none",
    width: "200px",
    height: "40px",
    padding: "10px",
  },
  error: {
    color: "#FF0000",
  },
  span: { color: "#968881" },
  link: {
    marginLeft: 10,
    listStyleType: "none",
    color: "#9a9999",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      color: "rgb(240,240,240)",
    },
  },
});
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const onSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (auth) => {
          dispatch(setUser({ ...currentUser, email: auth.user.email }));
          navigate("/");
        },
        (e) => {
          setError("Invalid email or password");
        }
      );
  };
  if (auth.currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className={classes.signInDialog}>
      <div className={classes.signInContent}>
        <h1 style={{ color: "white" }}>Sign In</h1>
        <div className={classes.signInInputs}>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className={classes.signInInput}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className={classes.signInInput}
          />
        </div>
        <div className={classes.error}>{error}</div>
      </div>
      <div className={classes.signInDialogActions}>
        <PrimaryButton
          onClick={onSignIn}
          className={classes.PrimaryButton}
          variant="text"
        >
          Sign In
        </PrimaryButton>
        <div>
          <span className={classes.span}>
            Don't have an account yet?
            <Link className={classes.link} to="/signup">
              Sign up here.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
