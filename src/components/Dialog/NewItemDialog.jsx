import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createUseStyles } from "react-jss";
import { addImagesFirebase, storage } from "../../config/Config";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import CustomizedSnackbars from "../snackbar/SnackbarFailed";
import SnackbarFailed from "../snackbar/SnackbarFailed";
import SnackbarSuccess from "../snackbar/SnackbarSuccess";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selector";
import SelectSmall from "../selector/Selector";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, TextField } from "@mui/material";

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

const useStyles = createUseStyles({
  signActionBlok: {
    display: "flex",
    justifyContent: "center",
  },
  uploadBtn: { marginTop: 10 },
  signBtn: {
    backgroundColor: "rgb(50,40,30)",
    color: "rgb(210,210,210)",
    "&:hover": {
      color: "rgb(50,40,30)",
      backgroundColor: "rgb(200,200,200)",
    },
  },
  dialogTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  dialogContainer: {
    backgroundColor: "#a1887f",
    color: "#3e2723",
    fontFamily: "Montserrat",
  },
  dialogInput: {
    height: "30px",
    borderRadius: "5px",
    border: "none",
    padding: "5px",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dialogInputsBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  dialogContentAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
function NewItemDialog({
  open,
  handleClose,
  handleSignUpClickOpen,
  handleSignInClickOpen,
  updater,
  setUpdater,
}) {
  const [categories, setCategories] = useState("");
  const [name, setName] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [price, setPrice] = useState("");
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarFailed, setOpenSnackbarFailed] = useState(false);
  const currenUser = useSelector(selectUser);
  const classes = useStyles();
  const handleCloseSnackbarSuccess = () => {
    setOpenSnackbarSuccess(!openSnackbarSuccess);
  };
  const handleCloseSnackbarFailed = () => {
    setOpenSnackbarFailed(!openSnackbarFailed);
  };
  const handleAddClick = () => {
    if (
      imageUpload &&
      name.trim().length &&
      price.trim().length &&
      categories.length
    ) {
      const id = uuidv4();
      const imageRef = ref(storage, `images/${id}`);
      uploadBytes(imageRef, imageUpload).then((res) => {
        const imageListRef = ref(storage, "images/");
        listAll(imageListRef).then((response) => {
          response.items.forEach((item) => {
            if (item.name === id) {
              getDownloadURL(item).then((url) => {
                addImagesFirebase(
                  name,
                  price,
                  url,
                  id,
                  currenUser.email,
                  categories
                );
                setUpdater(() => {
                  return !updater;
                });
              });
            }
          });
          handleCloseSnackbarSuccess();
          handleCloseDialog();
        });
      });
    } else {
      handleCloseSnackbarFailed();
    }
  };
  const handleCloseDialog = () => {
    handleClose();
    setOpenSnackbarFailed(false);
    setName("");
    setPrice("");
    setImageUpload(null);
    setCategories("");
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className={classes.dialogContainer}>
            <DialogTitle
              id="alert-dialog-title"
              className={classes.dialogTitle}
            >
              <b>Adding new item</b>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Grid container spacing={4}>
                <Grid item xs={5} sm={5}>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={5} sm={5}>
                  <TextField
                    id="standard-basic"
                    label="Price"
                    variant="standard"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Grid>
                <Grid item xs={5} sm={5}>
                  <SelectSmall
                    categories={categories}
                    setCategories={setCategories}
                  />
                </Grid>
                <Grid item xs={5} sm={5}>
                  <Button
                    className={classes.uploadBtn}
                    variant="contained"
                    component="label"
                  >
                    upload photo
                    <input
                      hidden
                      onChange={(e) => {
                        setImageUpload(e.target.files[0]);
                      }}
                      accept="image/*"
                      multiple
                      type="file"
                    />
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className={classes.signActionBlok}>
              <Button onClick={handleAddClick} className={classes.signBtn}>
                Add item
              </Button>
              <Button onClick={handleCloseDialog} className={classes.signBtn}>
                Cancel
              </Button>
            </DialogActions>
            {openSnackbarFailed && (
              <SnackbarFailed
                handleCloseSnackbarFailed={handleCloseSnackbarFailed}
              />
            )}
          </div>
        </Dialog>
        <SnackbarSuccess
          handleCloseSnackbarSuccess={handleCloseSnackbarSuccess}
          open={openSnackbarSuccess}
        >
          Your item was successfully added
        </SnackbarSuccess>
      </div>
    </ThemeProvider>
  );
}
export default NewItemDialog;
