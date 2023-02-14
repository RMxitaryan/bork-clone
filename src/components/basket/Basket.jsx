import { fontSize, height } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, deleteItemFirebase } from "../../config/Config";
import { setBasket } from "../../redux/user/actions";
import { selectBasket } from "../../redux/user/selector";
import BuyDialog from "../Dialog/BuyDialog";
import SnackbarSuccess from "../snackbar/SnackbarSuccess";
import BasketCard from "./BasketCard";
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
});
function Basket() {
  const [overAllCount, setOverAllCount] = useState();
  const [overAllPrice, setOverAllPrice] = useState();
  const classes = useStyles();
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {
    const colRef = collection(db, "Basket");
    getDocs(colRef)
      .then((snapshot) => {
        let arr = [];
        let price = 0;
        let count = 0;
        snapshot.docs.forEach((doc) => {
          if (auth.currentUser.email === doc.id) {
            const obj = doc.data();
            for (const item in obj) {
              arr.push(obj[item]);
              count += obj[item].count;
              price += obj[item].count * obj[item].price;
              console.log(count, "count", price, "price");
            }
          }
        });
        setOverAllCount(count);
        setOverAllPrice(price);
        dispatch(setBasket(arr));
      })
      .catch((err) => console.log(err.message));
    console.log(basket, "basket");
  }, []);
  const overAllPlus = (price) => {
    setOverAllPrice(overAllPrice + Number(price));
    setOverAllCount(overAllCount + 1);
  };
  const overAllMinus = (price) => {
    setOverAllPrice(overAllPrice - Number(price));
    setOverAllCount(overAllCount - 1);
  };
  const handleBuyClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBuy = () => {
    basket.map((item) => {
      deleteItemFirebase(auth.currentUser.email, item.id);
    });
    dispatch(setBasket([]));
    setOpen(false);
    setOpenSnackbar(true);
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <div className={classes.main}>
      <div className={classes.header}>Your orders</div>
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
            <button className={classes.buttonBuy} onClick={handleBuyClick}>
              BUY
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <BuyDialog handleBuy={handleBuy} handleClose={handleClose} open={open} />
      <SnackbarSuccess
        handleCloseSnackbarSuccess={handleSnackbarClose}
        open={openSnackbar}
      >
        You have just successfully bought basket`s products
      </SnackbarSuccess>
    </div>
  );
}
export default Basket;
