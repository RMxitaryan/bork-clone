import React from "react";
import { createUseStyles } from "react-jss";
import { Button } from "@mui/material";

const useStyles = createUseStyles({
  PrimaryButton: {
    color: "white",
    transition: "all 0.5s ease-in-out ",
    "&:hover": {
      boxShadow: "inset  6.5em  0 0 0  #b5582a",
    },
    "&:focus": {
      boxShadow: "inset 6.5em 0 0 0  #b5582a",
    },
  },
});

function PrimaryButton({ children, ...rest }) {
  const classes = useStyles();
  return (
    <Button className={classes.PrimaryButton} {...rest}>
      {children}
    </Button>
  );
}

export default PrimaryButton;
