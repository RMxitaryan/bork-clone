import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../config/Config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/selector';
import { setUser } from '../../../redux/user/actions';
import { getAuth, updateProfile } from 'firebase/auth';

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
	updateBtn: {
		background: 'linear-gradient(45deg, #FF8E53 30%,  #5a5555 90%)',
		color: 'white',
	},
	cancelBtn: {
		color: '#a1887f',
	},
	actions: {
		flex: 0.5,
		justifyContent: 'space-between',
	},
	textField: { backgroundColor: 'white', borderRadius: '5px', width: '600px' },
});

function EditProfile({ name, surname }) {
	const classes = useStyles();
	const currentUser = useSelector(selectUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const [user, setUser] = useState({
	//   firstName: "",
	//   lastName: "",
	//   email: "",
	//   phone: "",
	// });
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const auth = getAuth();

	const onUpdateClick = () => {
		// updateProfile(auth.currentUser, {
		//   firstName,
		//   lastName,
		//   phone,
		// });

		dispatch(
			setUser({
				...currentUser,
				firstName: firstName,
				lastName: lastName,
				phone: phone,
			})
		);
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
									// setUser({ ...user, firstName: e.target.value });
									setFirstName(e.target.value);
								}}
								className={classes.textField}
								variant="outlined"
							/>
							<h5>Email</h5>
							<TextField
								value={email}
								onChange={(e) => {
									// setUser({ ...user, email: e.target.value });
									setEmail(e.target.value);
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
									// setUser({ ...user, lastName: e.target.value });
									setLastName(e.target.value);
								}}
								className={classes.textField}
								variant="outlined"
							/>
							<h5>Phone number</h5>
							<TextField
								value={phone}
								onChange={(e) => {
									// setUser({ ...user, phone: e.target.value });
									setPhone(e.target.value);
								}}
								className={classes.textField}
								variant="outlined"
							/>
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
