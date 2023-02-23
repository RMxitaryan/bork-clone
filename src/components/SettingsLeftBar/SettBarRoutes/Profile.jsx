import React, { useEffect } from 'react';
import Home from '../../HomePage/Home';
import AccSettBar from '../AccSettBar';
import { makeStyles } from '@mui/styles';
import ProfileDialog from '../../Dialog/ProfileDialog';

const useStyles = makeStyles({
	Profile: {
		display: 'flex',
		flexDirection: 'row',
	},
	leftBar: {
		width: '30vh',
	},
});

function Profile({ open, handleClose }) {
	const classes = useStyles();

	return (
		<div className={classes.Profile}>
			<div className={classes.leftBar}>
				<ProfileDialog open={open} handleClose={handleClose} />
			</div>
			<div className={classes.rightBar}></div>
		</div>
	);
}

export default Profile;
