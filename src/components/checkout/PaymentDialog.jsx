import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createUseStyles } from "react-jss";
import { Grid, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { selectCheckoutInfo } from "../../redux/user/selector";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout } from "../../redux/user/actions";

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
  shipping: {},
  content: { display: "grid", justifyContent: "space-between" },
});
const theme = createTheme({
  palette: {
    primary: {
      main: "#ef6f2e",
    },
    secondary: {
      main: "#ef6f2e",
    },
  },
});

export const PaymentDialog = () => {
  const classes = useStyles();
  const checkoutInfo = useSelector(selectCheckoutInfo);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h6 className={classes.shipping}>Payment details</h6>
        <DialogContent>
          <div className={classes.content}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
                <div className={classes.cardName}>
                  <TextField
                    id="standard-basic"
                    label="Card name"
                    variant="standard"
                    fullWidth
                    value={checkoutInfo.cardName}
                    onChange={(e) =>
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          cardName: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className={classes.cardNumber}>
                  <TextField
                    id="standard-basic"
                    label="Card number"
                    variant="standard"
                    fullWidth
                    value={checkoutInfo.cardNumber}
                    onChange={(e) =>
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          cardNumber: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <TextField
                    type="tel"
                    id="standard-basic"
                    label="Expiry date"
                    variant="standard"
                    fullWidth
                    value={checkoutInfo.expiryDate}
                    onChange={(e) =>
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          expiryDate: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="CVC"
                    variant="standard"
                    fullWidth
                    value={checkoutInfo.cvc}
                    onChange={(e) =>
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          cvc: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </div>
    </ThemeProvider>
  );
};
