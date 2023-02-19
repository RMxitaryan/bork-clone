import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import BackButton from "../Button/BackButton";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { selectBorkHome } from "../../redux/user/selector";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Config";
import { setBorkHome } from "../../redux/user/actions";
import { Card } from "../Cards/Card";
import { Footer } from "../footer/Footer";

const useStyles = createUseStyles({
  header: {
    position: "relative",
    height: "calc(75vh - 138px)",
    width: "100%",
    minHeight: "412px",
    maxHeight: "700px",
    overflow: "hidden",
  },
  image: {
    position: "static",
    top: "0",
    left: "0",
    zIndex: "100",
    display: "inline-block",
    width: "100%",
    // height: "100%",
    // // overflow: "hidden",
    // // verticalAlign: "top",
    // // backgroundRepeat: "no-repeat",
    // // backgroundPosition: "50%",
    // // backgroundSize: "cover",
    // // opacity: "1",
    // // transition: "opacity .5s ease-out",
    // // pointerEvents: "all",
    // // willChange: "opacity",
  },
  picture: {
    position: "relative",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    transition: "opacity .3s ease-out",
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "top",
    imageRendering: "-webkit-optimize-contrast",
  },
  title: {
    position: "absolute",
    top: "60%",
    right: "0",
    left: "0",
    margin: "auto",
    textShadow: "0 0 10px #000",
    transform: "translateY(-50%)",
    letterSpacing: "3px",
  },
  name: {
    width: "100%",
    marginBottom: "4vh",
    color: "#fff",
    fontWeight: "400",
    fontSize: "34px",
    lineHeight: "1.25",
    whiteSpace: "normal",
    textAlign: "center",
    fontFamily: "bork,Helvetica,Arial,sans-serif",
  },
  text: {
    width: "40%",
    margin: "0 auto 40px",
    color: "#fff",
    fontSize: "16px",
    fontFamily: "Akzidenz-Ext,Helvetica,Arial,sans-serif",
    lineHeight: "1.563",
    textAlign: "center",
  },
  itemsBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});
function BorkHome() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const borkHomeCards = useSelector(selectBorkHome);
  useEffect(() => {
    const colRef = collection(db, "bork home");
    getDocs(colRef)
      .then((snapshot) => {
        let arr = [];
        for (let i = 0; i < 9; i++) {
          if (snapshot.docs[i]) {
            arr.push({ ...snapshot.docs[i].data(), id: snapshot.docs[i].id });
          }
        }
        // snapshot.docs.forEach((doc) => {

        // });
        console.log(arr, "bbbbbb");
        dispatch(setBorkHome(arr));
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <section className={classes.header}>
        <div className={classes.image}>
          <picture>
            <img
              src="/img/bork-home.jpg"
              alt="kitchen"
              className={classes.picture}
            />
          </picture>
        </div>
        <div className={classes.title}>
          <h1 className={classes.name}>BORK Home</h1>
          <div className={classes.text}>
            Stylish details highlight your sophisticated taste
          </div>
          <BackButton>Back</BackButton>
        </div>
      </section>
      <div className={classes.itemsBlock}>
        {borkHomeCards.map((item) => {
          return (
            <Card
              key={uuidv4()}
              src={item.src}
              price={item.price}
              name={item.name}
              id={item.id}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}
export default BorkHome;
