import { BorderColor } from "@mui/icons-material";
import { width } from "@mui/system";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  changeCount,
  deleteAddedItemFirebaseCategories,
  deleteAddedItemFirebaseImages,
  deleteItemFirebase,
  deleteItemFirebaseFavorite,
} from "../../config/Config";
import {
  selectAddedItems,
  selectBasket,
  selectFavourite,
} from "../../redux/user/selector";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  setAddedItems,
  setBasket,
  setFavourite,
} from "../../redux/user/actions";
import DeleteItemDialog from "../Dialog/DeleteItemDialog";
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = createUseStyles({
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flexEnd",
    marginBottom: 2,
    borderTopLeftRadius: 10,
    borderLeftStyle: "solid",
    borderLeftColor: "rgba(46, 40, 38, 0.8)",
  },
  cardLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 360,
    backgroundColor: "rgba(46, 40, 38, 0.8)",
  },
  itemImage: {
    height: "100%",
    display: "flex",
    flex: 3,
    alignItems: "center",
  },
  image: {
    transition: "transform .3s ease,opacity .3s,-webkit-transform .3s ease",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
    },
  },
  cardInformation: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  itemName: {
    fontSize: 23,
    color: "white",
    flex: 4,
  },
  countBlock: {
    backgroundColor: "#625A57",
    height: 50,
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#625A57",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    justifyContent: "space-evenly",
  },
  count: {
    fontSize: 20,
    color: "white",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  arrow: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  priceBlock: {
    height: "50px",
    width: 70,
  },
  price: {
    marginTop: "9%",
    color: "white",
    fontSize: 20,
  },
  plus: {
    cursor: "pointer",
  },
  minus: {
    cursor: "pointer",
    transform: "rotate(180deg)",
  },
  closeBlock: {
    backgroundColor: "rgba(46, 40, 38, 0.8)",
    display: "flex",
    justifyContent: "flex-end",
    height: 40,
    paddingTop: 20,
    paddingRight: 20,
    "&:hover": {
      cursor: "pointer",
    },
  },
});
function AddedItem({
  id,
  price,
  name,
  src,
  categories,
  setOverAllAddCount,
  overAllAddCount,
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const addedItems = useSelector(selectAddedItems);

  const handleDeleteItem = () => {
    setOverAllAddCount(overAllAddCount - 1);
    deleteAddedItemFirebaseImages(id);
    deleteAddedItemFirebaseCategories(categories, id);
    dispatch(
      setAddedItems(
        addedItems.filter((item) => {
          return item.id !== id;
        })
      )
    );
  };
  return (
    <div className={classes.card}>
      <div className={classes.closeBlock}>
       <DeleteIcon className="" width={20} onClick={() => setOpenDeleteDialog(true)}/>
        {/* <img
          src="img/close.png"
          width={20}
          onClick={() => setOpenDeleteDialog(true)}
        /> */}
      </div>
      <div className={classes.cardLeft}>
        <div className={classes.itemImage}>
          <img src={src} height={150} width={150} className={classes.image} />
        </div>
        <div className={classes.itemName}>{name}</div>
        <div className={classes.cardInformation}>
          <div className={classes.priceBlock}>
            <p className={classes.price}>{`${price} $`}</p>
          </div>
        </div>
      </div>
      <DeleteItemDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleDeleteItem={handleDeleteItem}
        name={name}
      />
    </div>
  );
}
export default AddedItem;
