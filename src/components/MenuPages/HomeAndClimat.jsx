import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../config/Config";
import { setHomeAndClimate, setKitchen } from "../../redux/user/actions";
import { selectHomeAndClimate } from "../../redux/user/selector";
import BackButton from "../Button/BackButton";
import { Card } from "../Cards/Card";
import { v4 as uuidv4 } from "uuid";
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    width: "100%",
  },
});
function HomeAndClimat() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const homeAndClimatCards = useSelector(selectHomeAndClimate);

  useEffect(() => {
    const colRef = collection(db, "home & climate");
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
        dispatch(setHomeAndClimate(arr));
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <section className={classes.header}>
        <div className={classes.image}>
          <picture>
            <img
              src="/img/home-and-climat.jpg"
              alt="Cleanliness and climate"
              className={classes.picture}
            />
          </picture>
        </div>
        <div className={classes.title}>
          <div className={classes.name}>Cleanliness and climate</div>
          <div className={classes.text}>
            Exclusive technologies taking care of purity and comfort of your
            home
          </div>
          <BackButton>Back</BackButton>
        </div>
      </section>
      <div className={classes.itemsBlock}>
        {homeAndClimatCards.map((item) => {
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
export default HomeAndClimat;
