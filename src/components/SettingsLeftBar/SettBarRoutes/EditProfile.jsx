import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { addUsersFirebase, db, storage, user } from '../../../config/Config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/selector';
import { setUser } from '../../../redux/user/actions';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { v4 as uuid } from 'uuid';

const theme = createTheme({
	palette: {
		primary: {
			light: '#bcaaa4',
			main: '#8d6e63',
			dark: '#795548',
			contrastText: '#fff',
		},
	},
});

const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		height: '91vh',
		color: 'white',
	},
	Account: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: '0 10px',
	},
	title: {
		margin: '50px 0px',
	},
	form: {
		display: 'flex',
		justifyContent: 'space-around',
		width: '100%',
		flex: 2,
	},
	formEvens: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '30vh',
	},
	descripton: {
		flex: 2,
		margin: 0,
		marginTop: '90px',
	},
	descriptonText: {
		borderRadius: '20px',
		border: '0.5px solid gray',
		padding: '5px',
	},
	updateBtn: { marginRight: 30 },
	cancelBtn: {
		color: '#a1887f',
	},
	actions: {
		display: 'flex',
		justifyContent: 'center',
	},
	textField: { backgroundColor: 'white', borderRadius: '5px', width: '600px' },
});

function EditProfile() {
	const classes = useStyles();
	const currentUser = useSelector(selectUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState(null);

	const auth = getAuth();

	const onUpdateClick = () => {
		const imageRef = ref(storage, `ProfilePhoto/${currentUser.email}.jpg`);
		uploadBytes(imageRef, image).then(() => {
			getDownloadURL(imageRef).then((url) => {
				console.log(url, 'url');
				setDoc(doc(db, 'SignedUpUsers', auth.currentUser.uid), {
					...currentUser,
					firstName: firstName,
					lastName: lastName,
					phone: phone,
					url: url,
					address: address,
				});
				dispatch(
					setUser({
						...currentUser,
						firstName: firstName,
						lastName: lastName,
						phone: phone,
						url: url,
						address: address,
					})
				);
			});
		});

		navigate('/profile');
	};
	console.log('currentUser', currentUser);
	return (
		<ThemeProvider theme={theme}>
			<div className={classes.wrapper}>
				<div className={classes.Account}>
					<h3 className={classes.title}>Authentication</h3>
					<div className={classes.form}>
						<div className={classes.formEvens}>
							<h5>First Name</h5>
							<TextField
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								className={classes.textField}
								variant="outlined"
							/>
							<h5>Address</h5>
							<TextField
								value={address}
								onChange={(e) => {
									setAddress(e.target.value);
								}}
								className={classes.textField}
								variant="outlined"
							/>
						</div>
						<div className={classes.formEvens}>
							<h5>Last Name</h5>
							<TextField
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								className={classes.textField}
								variant="outlined"
							/>
							<h5>Phone number</h5>
							<TextField
								value={phone}
								onChange={(e) => {
									setPhone(e.target.value);
								}}
								className={classes.textField}
								variant="outlined"
							/>
						</div>
					</div>
					<div className={classes.uploadImage}>
						<div
							onChange={(e) => {
								setImage(e.target.files[0]);
							}}
						>
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="label"
							>
								<input hidden accept="image/*" type="file" />
								<PhotoCamera />
							</IconButton>
						</div>
					</div>
					<div className={classes.descripton}>
						<h4 className={classes.descriptonTitle}>Description</h4>
						<p className={classes.descriptonText}>
							This page is for viewing or editing current Account data.If you
							want to update your data just click on "Update" button below or if
							you want to cancel the changes you have done click on "Cancel"
							button below
						</p>
					</div>
					<div className={classes.actions}>
						<div onClick={onUpdateClick}>
							<Button onClick={onUpdateClick} className={classes.updateBtn}>
								Update
							</Button>
						</div>
						<div
							onClick={() => {
								navigate('/profile');
							}}
						>
							<Button className={classes.cancelBtn}>Cancel</Button>
						</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default EditProfile;
