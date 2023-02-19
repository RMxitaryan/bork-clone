import { Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import AddressDialog from "./AddressDialog";
import { PaymentDialog } from "./PaymentDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const useStyles = createUseStyles({
  dialog: {
    color: "#3a3330",
    display: "flex",
    justifyContent: "center",
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "center",
    color: "#ef6f2e",
  },
  readyOrder: {
    display: "block",
    marginLeft: 20,
    marginRight: 20,
  },
});
const theme = createTheme({
  palette: {
    primary: {
      main: "#ef6f2e",
    },
  },
});
function Checkout({ open, handleCloseCheckout, handleBuy }) {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressDialog />;
      case 1:
        return <PaymentDialog />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Dialog
          open={open}
          onClose={handleCloseCheckout}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
          width={500}
          height={700}
        >
          <DialogTitle className={classes.dialogTitle}>
            {"Checkout"}
          </DialogTitle>
          {activeStep === 2 ? (
            <div className={classes.readyOrder}>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                We accept your order. We have emailed your order confirmation,
                and will send you an update when your order has shipped.
              </Typography>
              <DialogActions>
                <Button
                  onClick={handleCloseCheckout}
                  className={classes.button}
                >
                  Close
                </Button>
              </DialogActions>
            </div>
          ) : (
            <>
              {getStepContent(activeStep)}
              <DialogActions className={classes.nextBlock}>
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === 1 ? (
                    <Button
                      className={classes.button}
                      onClick={() => {
                        handleBuy();
                        handleNext();
                      }}
                    >
                      Order
                    </Button>
                  ) : (
                    <Button onClick={handleNext} className={classes.button}>
                      Next
                    </Button>
                  )}
                </div>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default Checkout;
