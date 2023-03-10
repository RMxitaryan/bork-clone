import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import FullScreenDialog from '../Search/SearchDialog';
import SignUpDialog from '../SignUp/SignUpDialog';
import SignInDialog from '../SignIn/SignInDialog';
import MenuBar from '../Menu/MenuBar';
import CarouselBox from '../CarouselBox';
import Navbar from '../Navbar/Navbar';
import { Card } from '../Cards/Card';
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	doc,
	setDoc,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCard,
	selectUser,
	selectBasket,
} from '../../redux/user/selector';
import {
	setBasket,
	setCard,
	setSearch,
	setUser,
} from '../../redux/user/actions';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../../config/Config';
import { AddCard } from '../Cards/AddCard';
import { Footer } from '../footer/Footer';
import {
	Box,
	Dialog,
	DialogContent,
	Fade,
	FormControlLabel,
	Paper,
} from '@mui/material';
import ProfileDialog from '../Dialog/ProfileDialog';

const useStyles = createUseStyles({
	name: {
		marginLeft: '200px',
		color: 'white',
		fontSize: 27,
	},
	headerTopRight: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 250,
		marginRight: 12,
	},

	searchIcon: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
	headerTopLeft: { marginLeft: 15 },
	itemsBlock: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
	},
});

function Home({
	setIsOpenMenu,
	isOpenMenu,
	openHome,
	signInDialogOpen,
	handleSignInClose,
	handleSignInClickOpen,
	signUpDialogOpen,
	handleSignUpClose,
	handleSearchClickOpen,
	handleSearchClose,
	handleSignUpClickOpen,
	searchDialogOpen,
	updater,
	setUpdater,
	openDialog,
	setOpenDialog,
}) {
	const classes = useStyles();
	const cards = useSelector(selectCard);
	const basket = useSelector(selectBasket);
	const dispatch = useDispatch();
	const currentUser = useSelector(selectUser);

	useEffect(() => {
		const colRef = collection(db, 'Images');
		getDocs(colRef)
			.then((snapshot) => {
				let arr = [];
				for (let i = 0; i < 7; i++) {
					if (snapshot.docs[i]) {
						arr.push({ ...snapshot.docs[i].data(), id: snapshot.docs[i].id });
					}
				}
				console.log(arr, 'aaaaaaaaaa');
				dispatch(setCard(arr));
			})
			.catch((err) => console.log(err.message));
	}, [updater]);

	useEffect(() => {
		const colRef = collection(db, 'Images');
		getDocs(colRef)
			.then((snapshot) => {
				let arr = [];
				snapshot.docs.forEach((doc) => {
					arr.push({ ...doc.data(), id: doc.id });
				});
				dispatch(setSearch(arr));
			})
			.catch((err) => console.log(err.message));
	}, [updater]);
	// =======
	// useEffect(() => {
	// 	const colRef = collection(db, 'Images');
	// 	getDocs(colRef)
	// 		.then((snapshot) => {
	// 			let arr = [];
	// 			for (let i = 0; i < 9; i++) {
	// 				if (snapshot.docs[i]) {
	// 					arr.push({ ...snapshot.docs[i].data(), id: snapshot.docs[i].id });
	// 				}
	// 			}
	// 			console.log(arr, 'aaaaaaaaaa');
	// 			dispatch(setCard(arr));
	// 		})
	// 		.catch((err) => console.log(err.message));
	// }, [updater]);

	useEffect(() => {
		const colRef = collection(db, 'SignedUpUsers');
		getDocs(colRef)
			.then((snapshot) => {
				let obj = {};
				snapshot.docs.forEach((doc) => {
					if (doc.id === auth.currentUser.uid) {
						obj = { ...doc.data() };
					}
				});
				dispatch(setUser({ ...obj }));
			})
			.catch((err) => console.log(err.message));
	}, []);

	const icon = (
		<Paper
			sx={{
				position: 'absolute',
				left: 0,
				top: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
			}}
		>
			<MenuBar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
		</Paper>
	);

	return (
		<div className={classes.app}>
			<FullScreenDialog
				handleClickOpen={handleSearchClickOpen}
				handleClose={handleSearchClose}
				open={searchDialogOpen}
				openHome={openHome}
				handleSignUpClose={handleSignUpClose}
				handleSignUpClickOpen={handleSignUpClickOpen}
				handleSignInClickOpen={handleSignInClickOpen}
				handleSignInClose={handleSignInClose}
			/>

			<CarouselBox />
			<Box>
				<FormControlLabel
					control={
						<div
							checked={isOpenMenu}
							onChange={() => {
								setIsOpenMenu(!isOpenMenu);
							}}
						></div>
					}
				/>
				<Box sx={{ display: 'flex' }}>
					<Fade in={isOpenMenu}>{icon}</Fade>
				</Box>
			</Box>
			{isOpenMenu ? null : (
				<>
					<SignInDialog
						open={signInDialogOpen}
						handleClose={handleSignInClose}
					/>
					<SignUpDialog
						open={signUpDialogOpen}
						handleClose={handleSignUpClose}
					/>
					<div className={classes.itemsBlock}>
						{cards.map((item) => {
							return (
								<Card
									key={uuidv4()}
									openHome={openHome}
									handleSignUpClose={handleSignUpClose}
									handleSignUpClickOpen={handleSignUpClickOpen}
									handleSignInClickOpen={handleSignInClickOpen}
									handleSignInClose={handleSignInClose}
									src={item.src}
									price={item.price}
									name={item.name}
									id={item.id}
								/>
							);
						})}
						{currentUser.email && (
							<AddCard
								handleSignUpClickOpen={handleSignUpClickOpen}
								handleSignInClickOpen={handleSignInClickOpen}
								updater={updater}
								setUpdater={setUpdater}
							/>
						)}
					</div>
					<ProfileDialog
						open={openDialog}
						handleClose={() => {
							setOpenDialog(false);
						}}
					/>
					<Footer />
				</>
			)}
		</div>
	);
}

export default Home;
