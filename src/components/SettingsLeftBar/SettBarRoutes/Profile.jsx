<<<<<<< HEAD
import React, { useEffect } from 'react';
import Home from '../../HomePage/Home';
import AccSettBar from '../AccSettBar';
import { makeStyles } from '@mui/styles';
import ProfileDialog from '../../Dialog/ProfileDialog';
=======
import React, { useEffect } from "react";
import Home from "../../HomePage/Home";
import AccSettBar from "../AccSettBar";
import { makeStyles } from "@mui/styles";
import FullScreenDialog from "../../Search/SearchDialog";
>>>>>>> 055b51547fc97990157b238b1a266c95123459ef

const useStyles = makeStyles({
	Profile: {
		display: 'flex',
		flexDirection: 'row',
	},
	leftBar: {
		width: '30vh',
	},
});

<<<<<<< HEAD
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
=======
function Profile({
  open,
  handleClose,
  key,
  openHome,
  handleSignUpClose,
  handleSignUpClickOpen,
  handleSignInClickOpen,
  handleSignInClose,
}) {
  const classes = useStyles();

  return (
    <div className={classes.Profile}>
      <div className={classes.leftBar}>
        <AccSettBar />
      </div>
      <FullScreenDialog
        handleClose={handleClose}
        open={open}
        openHome={openHome}
        handleSignUpClose={handleSignUpClose}
        handleSignUpClickOpen={handleSignUpClickOpen}
        handleSignInClickOpen={handleSignInClickOpen}
        handleSignInClose={handleSignInClose}
      />
      <div className={classes.rightBar}></div>
    </div>
  );
>>>>>>> 055b51547fc97990157b238b1a266c95123459ef
}

export default Profile;
