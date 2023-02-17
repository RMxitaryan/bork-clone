import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { addItemFirebase, auth } from '../../config/Config';
import SignDialog from '../Dialog/SignDialog';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selector';
import NewItemDialog from '../Dialog/NewItemDialog';
const useStyles = createUseStyles({
	cardContainer: {
		position: 'relative',
		display: 'inline-block',
		width: '300px',
		marginTop: '40px',
		verticalAlign: 'top',
		transition: 'opacity .5s ease',
		willChange: 'opacity',
		height: '420px',
	},
	pictureWrapper: {
		width: '100%',
		height: '420px',
		overflow: 'hidden',
		backgroundColor: '#26211E',
		borderRadius: '12px',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
	},

	cardFooter: {
		position: 'relative',
		paddingBottom: '5px',
		marginTop: '11px',
		fontSize: '14px',
		position: 'relative',
		display: 'block',
		maxHeight: '4.5em',
		overflow: 'hidden',
		lineHeight: '1.5',
	},
	addIcon: {
		fontSize: '75px',
		color: 'white',
	},
	addIconWrapper: {
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		'&:hover': {
			backgroundColor: '#6B6666',
		},
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		cursor: 'pointer',
	},
});
export const AddCard = ({
	handleSignUpClickOpen,
	handleSignInClickOpen,
	openHome,
	src,
	price,
	name,
	updater,
	setUpdater,
}) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [openSignDialog, setOpenSignDialog] = useState(false);
	const currentUser = useSelector(selectUser);
	const [openNewItemDialog, setOpenNewItemDialog] = useState(false);
	const handelAddClick = () => {
		if (auth.currentUser) {
			setOpen(!open);
		} else {
			setOpenSignDialog(true);
		}
	};

	return (
		<article className={classes.cardContainer}>
			<div className={classes.pictureWrapper}>
				<div className={classes.addIconWrapper}>
					<AddIcon onClick={handelAddClick} className={classes.addIcon} />
				</div>
			</div>
			<SignDialog
				open={openSignDialog}
				handleClose={() => {
					setOpenSignDialog(false);
				}}
				handleSignUpClickOpen={handleSignUpClickOpen}
				handleSignInClickOpen={handleSignInClickOpen}
			/>
			<NewItemDialog
				updater={updater}
				setUpdater={setUpdater}
				open={open}
				handleClose={() => {
					setOpen(false);
				}}
			/>
		</article>
	);
};
