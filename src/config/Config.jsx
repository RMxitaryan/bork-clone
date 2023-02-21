import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCt1AdV22OrgmirQNOn54vFVbkywPvziNg",
  authDomain: "online-shop-e417e.firebaseapp.com",
  databaseURL:
    "https://online-shop-e417e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "online-shop-e417e",
  storageBucket: "online-shop-e417e.appspot.com",
  messagingSenderId: "692023712078",
  appId: "1:692023712078:web:01985f1d1b25b9fe45261f",
  measurementId: "G-MJK1KCZKR1",
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const storage = getStorage(app);

// const colRef = collection(db, "SignedUpUsers");
// getDocs(colRef)
//   .then((snapshot) => {
//     let users = [];
//     snapshot.docs.forEach((doc) => {
//       users.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(users);
//   })
//   .catch((err) => console.log(err.message));

export const addUsersFirebase = (userName, email, password) => {
  setDoc(doc(db, "SignedUpUsers", uuidv4()), {
    userName: userName,
    email: email,
    password: password,
  });
};

export const addImagesFirebase = (name, price, src, id, email, categories) => {
  setDoc(doc(db, "Images", id), {
    src: src,
    price: price,
    name: name,
    email: email,
    categories: categories,
  });
  setDoc(doc(db, categories, id), {
    src: src,
    price: price,
    name: name,
    email: email,
  });
};

export const addBasket = (email) => {
  setDoc(doc(db, "Basket", email), {});
};
export const addFavorite = (email) => {
  setDoc(doc(db, "Favorite", email), {});
};

export const addItemFirebase = (card, email, id) => {
  updateDoc(doc(db, "Basket", email), {
    [id]: card,
  });
};
export const addItemFirebaseFavorite = (card, email, id) => {
  updateDoc(doc(db, "Favorite", email), {
    [id]: card,
  });
};

export const changeCount = (email, id, card) => {
  updateDoc(doc(db, "Basket", email), {
    [id]: card,
  });
};

export const deleteItemFirebase = (email, id) => {
  updateDoc(doc(db, "Basket", email), {
    [id]: deleteField(),
  });
};
export const deleteItemFirebaseFavorite = (email, id) => {
  updateDoc(doc(db, "Favorite", email), {
    [id]: deleteField(),
  });
};
export const deleteAddedItemFirebaseImages = (id) => {
  deleteDoc(doc(db, "Images", id));
};
export const deleteAddedItemFirebaseCategories = (categories, id) => {
  deleteDoc(doc(db, categories, id));
};
