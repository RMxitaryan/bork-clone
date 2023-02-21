import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createUseStyles } from "react-jss";
import PrimaryButton from "../Button/Button";
import { useState } from "react";

const useStyles = createUseStyles({
  dialog: {
    backgroundColor: "#3a3333",
    display: "flex",
    flexDirection: "column",
    color: "rgb(230,230,230)",
  },
  input: {
    borderRadius: "25px",
    border: "none",
    width: "250px",
    height: "30px",
    padding: "10px",
    marginTop: 20,
  },
});

export default function DeleteItemDialog({
  openDeleteDialog,
  setOpenDeleteDialog,
  handleDeleteItem,
  name,
}) {
  const [value, setValue] = useState("");
  const classes = useStyles();

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <Dialog open={openDeleteDialog} onClose={handleClose}>
        <div className={classes.dialog}>
          <DialogContent>
            <div>Confirm you want to delete this item by typing its name</div>

            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="item name"
              className={classes.input}
            />
          </DialogContent>
          <DialogActions>
            <PrimaryButton onClick={handleClose}>Cancel</PrimaryButton>
            <PrimaryButton onClick={handleDeleteItem} disabled={value !== name}>
              Delete
            </PrimaryButton>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
