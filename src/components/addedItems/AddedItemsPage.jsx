import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  db,
  deleteAddedItemFirebaseCategories,
  deleteAddedItemFirebaseImages,
  deleteItemFirebaseFavorite,
} from "../../config/Config";
import { setAddedItems, setFavourite } from "../../redux/user/actions";
import { selectAddedItems, selectFavourite } from "../../redux/user/selector";
import PrimaryButton from "../Button/Button";
import BuyDialog from "../Dialog/BuyDialog";
import { Footer } from "../footer/Footer";
import AddedItem from "./AddedItem";
const useStyles = createUseStyles({
  main: {
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    height: 80,
    fontSize: 40,
    color: "#9D9390",
    marginTop: 80,
    textAlign: "center",
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    height: 360,
    marginLeft: "2%",
  },
  cardTogather: {
    display: "flex",
    flexDirection: "row",
  },
  cardRight: {
    display: "flex",
    flexDirection: "column",
    width: "26%",
    height: 360,
    backgroundColor: "rgba(46, 40, 38, 0.8)",
    marginLeft: 2,
  },
  cardRightTop: {
    width: "100%",
    height: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  border: {
    backgroundColor: "#625A57",
    width: "80%",
    height: 1,
    marginLeft: "10%",
  },
  borderTop: {
    backgroundColor: "#625A57",
    width: 1,
    height: "70%",
    marginTop: "7%",
  },
  overAll: {
    height: "100%",
    color: "white",
    fontSize: 22,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  underOverAll: {
    color: "#625A57",
    fontSize: 20,
  },
  buttonBuy: {
    width: "40%",
    height: 45,
    marginLeft: "30%",
    marginTop: "8%",
    letterSpacing: "1.4px",
    border: "2px solid #B5582A",
    backgroundColor: "#B5582A",
    color: "white",
    borderRadius: 27,
    "&:hover": {
      backgroundColor: "#ED8855",
      borderColor: "#ED8855",
    },
  },
  count: {
    paddingTop: 20,
  },
  clearButton: {
    width: "40%",
    height: 45,
    marginLeft: "30%",
    marginTop: "8%",
    letterSpacing: "1.4px",
    border: "2px solid #B5582A",
    backgroundColor: "#B5582A",
    color: "white",
    borderRadius: 27,
    "&:hover": {
      backgroundColor: "#ED8855",
      borderColor: "#ED8855",
    },
  },
});
function AddedItemsPage({ overAllAddCount, setOverAllAddCount }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const addedItems = useSelector(selectAddedItems);
  const dispatch = useDispatch();

  const handleClear = () => {
    addedItems.map((item) => {
      deleteAddedItemFirebaseImages(item.id);
      deleteAddedItemFirebaseCategories(item.categories, item.id);
    });
    dispatch(setAddedItems([]));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClearClick = () => {
    setOpen(true);
  };
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        {addedItems.length ? "Your added items" : "You don`t have added items"}
      </div>
      <div className={classes.cardTogather}>
        <div className={classes.cards}>
          {addedItems.map((item) => {
            return (
              <AddedItem
                name={item.name}
                price={item.price}
                src={item.src}
                categories={item.categories}
                id={item.id}
                setOverAllAddCount={setOverAllAddCount}
                overAllAddCount={overAllAddCount}
              />
            );
          })}
        </div>
        {addedItems.length ? (
          <div
            className={classes.cardRight}
            style={{
              height:
                360 +
                (addedItems.length > 1 ? (addedItems.length - 1) * 362 : 0),
            }}
          >
            <div className={classes.cardRightTop}>
              <div className={classes.overAll}>
                <div className={classes.count}>{overAllAddCount}</div>

                <div className={classes.underOverAll}>items</div>
              </div>
            </div>
            <div className={classes.border}></div>
            <PrimaryButton
              onClick={handleClearClick}
              className={classes.clearButton}
            >
              Clear All
            </PrimaryButton>
          </div>
        ) : (
          <></>
        )}
      </div>
      <BuyDialog handleYes={handleClear} handleClose={handleClose} open={open}>
        Are you sure you want to delete all these products?
      </BuyDialog>
      <Footer />
    </div>
  );
}
export default AddedItemsPage;
