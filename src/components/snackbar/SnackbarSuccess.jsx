import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarSuccess({
  handleCloseSnackbarSuccess,
  children,
  open,
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    handleCloseSnackbarSuccess();
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {children}
        </Alert>
      </Snackbar>
    </>
  );
}
