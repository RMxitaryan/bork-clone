import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { Provider } from 'react-redux';
import { store } from './redux/store';
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

// firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
