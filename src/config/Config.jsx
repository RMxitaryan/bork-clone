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
} from "firebase/firestore";
import "firebase/compat/storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
// 	apiKey: 'AIzaSyCt1AdV22OrgmirQNOn54vFVbkywPvziNg',
// 	authDomain: 'online-shop-e417e.firebaseapp.com',
// 	databaseURL:
// 		'https://online-shop-e417e-default-rtdb.europe-west1.firebasedatabase.app',
// 	projectId: 'online-shop-e417e',
// 	storageBucket: 'online-shop-e417e.appspot.com',
// 	messagingSenderId: '692023712078',
// 	appId: '1:692023712078:web:01985f1d1b25b9fe45261f',
// 	measurementId: 'G-MJK1KCZKR1',
// };
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAnmGYpUbn78IfF081K5BtIy8czQn6xc8",
  authDomain: "bork-clone.firebaseapp.com",
  databaseURL: "https://bork-clone-default-rtdb.firebaseio.com",
  projectId: "bork-clone",
  storageBucket: "bork-clone.appspot.com",
  messagingSenderId: "881131314599",
  appId: "1:881131314599:web:aa1d90e71aa15230c2aa82",
  measurementId: "G-T95BJG1T3Y",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

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
