import { createUseStyles } from "react-jss";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import {
  addItemFirebase,
  addItemFirebaseFavorite,
  auth,
  deleteItemFirebase,
  deleteItemFirebaseFavorite,
} from "../../config/Config";
import SignDialog from "../Dialog/SignDialog";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasket,
  selectFavourite,
  selectUser,
} from "../../redux/user/selector";
import { setBasket, setFavourite } from "../../redux/user/actions";

const useStyles = createUseStyles({
  cardContainer: {
    position: "relative",
    display: "inline-block",
    width: "300px",
    marginTop: 40,
    verticalAlign: "top",
    transition: "opacity .5s ease",
    willChange: "opacity",
  },
  pictureWrapper: {
    position: "relative",
    width: "100%",
    height: "420px",
    overflow: "hidden",
    backgroundColor: "#26211E",
    borderRadius: "12px",
  },
  pictureSizes: {
    maxWidth: "90%",
    maxHeight: "80%",
    bottom: "10%",
    top: "60",
    margin: "10px",
    position: "absolute",
    transition: "transform .3s ease,opacity .3s,-webkit-transform .3s ease",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
    },
  },
  addIcon: {
    position: "absolute",
    color: "white",
    pointerEvents: "auto",
    top: "10px",
    left: "90%",
    padding: "0",
    backgroundColor: "transparent",
    border: "none",
    transition: "all .2s ease-out",
    width: "20px",
    height: "20px",
    margin: "0",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.5)",
      borderRadius: "27.5px",
      transition: "opacity .3s ease 0s,background-color .3s ease 0s",
      backgroundColor: "#EF6F2E",
    },
  },
  addedItem: {
    position: "absolute",
    color: "white",
    pointerEvents: "auto",
    top: "10px",
    left: "90%",
    padding: "0",
    backgroundColor: "transparent",
    border: "none",
    transition: "all .2s ease-out",
    width: "20px",
    height: "20px",
    margin: "0",
    borderRadius: "27.5px",
    backgroundColor: "#EF6F2E",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.5)",
      borderRadius: "27.5px",
      transition: "opacity .3s ease 0s,background-color .3s ease 0s",
    },
  },
  cardFooter: {
    position: "relative",
    paddingBottom: "5px",
    marginTop: "11px",
    fontSize: "14px",
    position: "relative",
    display: "block",
    maxHeight: "4.5em",
    overflow: "hidden",
    lineHeight: "1.5",
  },
  title: {
    display: "block",
    fontWeight: "500",
    fontSize: "16px",
    fontFamily: "Montserrat",
    lineHeight: "inherit",
    letterSpacing: ".3px",
    transition: "opacity .3s ease",
    willChange: "opacity",
    color: "rgb(230,230,230)",
    paddingLeft: "10px",
  },
  price: {
    display: "inline-block",
    paddingTop: "1px",
    color: "#9D9390",
    fontWeight: "500",
    fontSize: "14px",
    fontFamily: "Akzidenz,Helvetica,Arial,sans-serif",
    lineHeight: "1.79",
    textAlign: "left",
    paddingLeft: "10px",
  },
  cardActionBlok: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteIcon: {
    position: "absolute",
    color: "white",
    pointerEvents: "auto",
    top: "10px",
    right: "90%",
    padding: "0",
    backgroundColor: "transparent",
    border: "none",
    transition: "all .2s ease-out",
    width: "20px",
    height: "20px",
    margin: "0",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.5)",
      borderRadius: "27.5px",
      transition: "opacity .3s ease 0s,background-color .3s ease 0s",
    },
  },
  favoriteActive: {
    position: "absolute",
    color: "red",
    pointerEvents: "auto",
    top: "10px",
    right: "90%",
    padding: "0",
    backgroundColor: "transparent",
    border: "none",
    transition: "all .2s ease-out",
    width: "20px",
    height: "20px",
    margin: "0",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.5)",
      borderRadius: "27.5px",
      transition: "opacity .3s ease 0s,background-color .3s ease 0s",
    },
  },
});
export const Card = ({
  handleSignUpClickOpen,
  handleSignInClickOpen,
  openHome,
  src,
  price,
  name,
  id,
}) => {
  const classes = useStyles();
  const [isAdd, setIsAdd] = useState(false);
  const [openSignDialog, setOpenSignDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const favorite = useSelector(selectFavourite);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(basket, "kkkk");
  useEffect(() => {
    if (currentUser.email) {
      basket.map((item) => {
        console.log(basket);
        if (item.id === id) {
          setIsAdd(true);
        }
      });
    }
  }, [currentUser.email, basket.length]);

  useEffect(() => {
    if (currentUser.email) {
      favorite.map((item) => {
        if (item.id === id) {
          setIsFavorite(true);
        }
      });
    }
  }, [currentUser.email, favorite.length]);

  const handelAddClick = () => {
    if (auth.currentUser) {
      const card = {
        src: src,
        name: name,
        price: price,
        id: id,
        count: 1,
      };
      dispatch(setBasket([...basket, card]));
      setIsAdd(true);
      addItemFirebase(card, currentUser.email, id);
      navigate("/basket");
    } else {
      setOpenSignDialog(true);
    }
  };
  const handleCheckClick = () => {
    setIsAdd(false);
    deleteItemFirebase(currentUser.email, id);
    dispatch(setBasket(basket.filter((item) => item.id !== id)));
  };
  const handleDeleteFavoriteItem = () => {
    dispatch(setFavourite(favorite.filter((item) => item.id !== id)));
    setIsFavorite(false);
    deleteItemFirebaseFavorite(currentUser.email, id);
  };

  const handelFavoriteClick = () => {
    if (auth.currentUser) {
      const card = {
        src: src,
        name: name,
        price: price,
        id: id,
      };
      dispatch(setFavourite([...favorite, card]));
      setIsFavorite(true);
      addItemFirebaseFavorite(card, currentUser.email, id);
      navigate("/favorite");
    } else {
      setOpenSignDialog(true);
    }
  };
  // useEffect(() => {
  //  if (!auth.currentUser) {
  //    setIsAdd(false);
  //    setIsFavorite(false);
  //  }
  // }, [openHome]);
  return (
    <article className={classes.cardContainer}>
      <div className={classes.pictureWrapper}>
        <Link>
          <img className={classes.pictureSizes} src={src} alt="item" />
        </Link>
        <div className={classes.cardActionBlok}>
          {isFavorite ? (
            <FavoriteIcon
              onClick={handleDeleteFavoriteItem}
              className={classes.favoriteActive}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={handelFavoriteClick}
              className={classes.favoriteIcon}
            />
          )}
          {isAdd ? (
            <CheckIcon
              onClick={handleCheckClick}
              className={classes.addedItem}
            />
          ) : (
            <AddIcon onClick={handelAddClick} className={classes.addIcon} />
          )}
        </div>
      </div>
      <footer className={classes.cardFooter}>
        <div>
          <span className={classes.title}>{name}</span>
          <span className={classes.price}>{`Price : ${price} $`}</span>
        </div>
      </footer>
      <SignDialog
        open={openSignDialog}
        handleClose={() => {
          setOpenSignDialog(false);
        }}
        handleSignUpClickOpen={handleSignUpClickOpen}
        handleSignInClickOpen={handleSignInClickOpen}
      />
    </article>
  );
};
