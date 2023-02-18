import {
  SET_USER,
  DELETE_USER,
  SET_CARD,
  SET_CARD_BASKET,
  SET_BORKHOME_CARD,
  SET_ACCESSORISE_CARD,
  SET_HEALTHANDBEAUTY_CARD,
  SET_KITCHEN_CARD,
  SET_HOMEANDCLIMATE_CARD,
  SET_FAVOURITE,
} from "../actionTypes";

export const setUser = (payload) => {
  return { type: SET_USER, payload };
};

export const deleteUser = (payload) => {
  return { type: DELETE_USER, payload };
};

export const setCard = (payload) => {
  return { type: SET_CARD, payload };
};

export const setBasket = (payload) => {
  return { type: SET_CARD_BASKET, payload };
};
export const setBorkHome = (payload) => {
  return { type: SET_BORKHOME_CARD, payload };
};
export const setAccessories = (payload) => {
  return { type: SET_ACCESSORISE_CARD, payload };
};
export const setHealthAndBeauty = (payload) => {
  return { type: SET_HEALTHANDBEAUTY_CARD, payload };
};
export const setKitchen = (payload) => {
  return { type: SET_KITCHEN_CARD, payload };
};
export const setHomeAndClimate = (payload) => {
  return { type: SET_HOMEANDCLIMATE_CARD, payload };
};
export const setFavourite = (payload) => {
  return { type: SET_FAVOURITE, payload };
};
