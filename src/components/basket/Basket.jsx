import { fontSize, height } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, deleteItemFirebase } from "../../config/Config";
import { setBasket } from "../../redux/user/actions";
import { selectBasket, selectUser } from "../../redux/user/selector";
import Checkout from "../checkout/Checkout";
import BuyDialog from "../Dialog/BuyDialog";
import SnackbarSuccess from "../snackbar/SnackbarSuccess";
import BasketCard from "./BasketCard";
import { v4 as uuid } from "uuid";
import BackButton from "../Button/BackButton";
import { Footer } from "../footer/Footer";
const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
  },
  order: {
    width: "100%",
    fontSize: 40,
    color: "#9D9390",
    marginLeft: "30%",
  },
  header: {
    display: "flex",
    justifyContent: "row",
    marginTop: 80,
    height: 80,
    width: "100%",
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
    width: "49%",
    color: "white",
    textAlign: "center",
    fontSize: 22,
    marginTop: "15%",
    display: "flex",
    flexDirection: "column",
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
  back: {
    display: "flex",
    alignItems: "start",
    marginLeft: "3%",
  },
});
function Basket({
  overAllCount,
  overAllPrice,
  setOverAllCount,
  setOverAllPrice,
}) {
  const classes = useStyles();
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const currentUser = useSelector(selectUser);

  const overAllPlus = (price) => {
    setOverAllPrice(overAllPrice + Number(price));
    setOverAllCount(overAllCount + 1);
  };
  const overAllMinus = (price) => {
    setOverAllPrice(overAllPrice - Number(price));
    setOverAllCount(overAllCount - 1);
  };
  const handleOpenCheckout = () => {
    setOpen(true);
  };
  const handleCloseCheckout = () => {
    setOpen(false);
  };
  const handleBuy = () => {
    basket.map((item) => {
      deleteItemFirebase(auth.currentUser.email, item.id);
    });
    dispatch(setBasket([]));
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.back}>
          <BackButton>Back</BackButton>
        </div>
        <div className={classes.order}>
          {basket.length ? "Your orders" : "You don`t have orders"}
        </div>
      </div>

      <div className={classes.cardTogather}>
        <div className={classes.cards}>
          {basket.map((item) => {
            return (
              <BasketCard
                id={item.id}
                price={item.price}
                name={item.name}
                src={item.src}
                count={item.count}
                overAllPlus={overAllPlus}
                overAllMinus={overAllMinus}
                key={uuid()}
              />
            );
          })}
        </div>
        {basket.length ? (
          <div
            className={classes.cardRight}
            style={{
              height: 360 + (basket.length > 1 ? (basket.length - 1) * 362 : 0),
            }}
          >
            <div className={classes.cardRightTop}>
              <div className={classes.overAll}>
                {overAllCount}
                <div className={classes.underOverAll}>items</div>
              </div>
              <div className={classes.borderTop}></div>
              <div className={classes.overAll}>
                {`${overAllPrice} $`}
                <div className={classes.underOverAll}>price</div>
              </div>
            </div>
            <div className={classes.border}></div>
            <button className={classes.buttonBuy} onClick={handleOpenCheckout}>
              Order
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Checkout
        open={open}
        handleCloseCheckout={handleCloseCheckout}
        handleBuy={handleBuy}
      />
      <Footer />
    </div>
  );
}
export default Basket;
