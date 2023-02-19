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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCheckoutInfo, selectUser } from "../../redux/user/selector";
import FormControl from "@mui/material/FormControl";
import { v4 as uuid } from "uuid";
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
  //   firstName: { width: 200, margin: "20px, 20px, 30px, 20px" },
  //   lastName: { width: 200 },
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

function AddressDialog() {
  const classes = useStyles();
  const currentUser = useSelector(selectUser);
  const checkoutInfo = useSelector(selectCheckoutInfo);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.address);
  const dispatch = useDispatch();
  const countries = require("i18n-iso-countries");
  console.log(checkoutInfo);
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h6 className={classes.shipping}>Shipping Address</h6>
        <DialogContent>
          <div className={classes.content}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <div className={classes.firstName}>
                  <TextField
                    id="standard-basic"
                    label="First name"
                    variant="standard"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.lastName}>
                  <TextField
                    id="standard-basic"
                    label="Last name"
                    variant="standard"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="email"
                    variant="standard"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="phone"
                    variant="standard"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Address line 1"
                    variant="standard"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Address line 2"
                    variant="standard"
                    fullWidth
                    value={checkoutInfo.addressTwo}
                    onChange={(e) => {
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          addressTwo: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <Select
                    style={{ width: "250px" }}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    defaultValue=""
                    value={checkoutInfo.country}
                    onChange={(e) => {
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          country: e.target.value,
                        })
                      );
                    }}
                  >
                    {countryArr?.length &&
                      countryArr.map(({ label, value }) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {label}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="City"
                    variant="standard"
                    fullWidth
                    value={checkoutInfo.city}
                    onChange={(e) => {
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          city: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="State/Province/Region"
                    variant="standard"
                    fullWidth
                    value={checkoutInfo.state}
                    onChange={(e) => {
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          state: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Zip / Postal code"
                    variant="standard"
                    fullWidth
                    color="secondary"
                    value={checkoutInfo.zipCode}
                    onChange={(e) => {
                      dispatch(
                        setCheckout({
                          ...checkoutInfo,
                          zipCode: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </div>
    </ThemeProvider>
  );
}

export default AddressDialog;
