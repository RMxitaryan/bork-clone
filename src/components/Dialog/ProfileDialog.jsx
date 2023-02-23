import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AccSettBar from '../SettingsLeftBar/AccSettBar';
import { createUseStyles } from 'react-jss';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

const useStyles = createUseStyles({
	dialogContent: {
		width: '100%',
		margin: 0,
		padding: 10,
	},
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose }) {
	const classes = useStyles();
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				// fullWidth={true}
				maxWidth="md"
				// sx={
				// 	{
				// 		// width: 'calc(184% - 74px)',
				// 		// position: 'absolute',
				// 		// top: 0,
				// 		// right: 0,
				// 	}
				// }
				PaperProps={{
					sx: {
						height: '100%',
						backgroundColor: '#3a3333',
						position: 'absolute',
						top: 60,
						right: 0,
						margin: 0,
					},
				}}
			>
				<DialogContent className={classes.dialogContent}>
					<AccSettBar />
				</DialogContent>
			</Dialog>
		</div>
	);
}
