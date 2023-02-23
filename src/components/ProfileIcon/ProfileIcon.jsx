import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createUseStyles } from 'react-jss';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { auth } from '../../config/Config';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/user/actions';
import { Fade } from '@mui/material';

const useStyles = createUseStyles({
	profileIcone: {
		cursor: 'pointer',
		color: 'rgb(200,200,200)',
		height: 30,
		width: 30,
	},
	link: {
		textDecoration: 'none',
		color: '#3a3333',
		'&:hover': {
			color: '#3a3333',
		},
	},
});

function ProfileIcon({ openHome, setOpenHome, openDialog, setOpenDialog }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<AccountCircleOutlinedIcon
				className={classes.profileIcone}
				src="/img/user.png"
				aria-controls={open ? 'demo-positioned-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			/>

			<Menu
				id="fade-menu"
				MenuListProps={{
					'aria-labelledby': 'fade-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem
					onClick={() => {
						handleClose();
						setOpenHome(false);
						setOpenDialog(true);
					}}
				>
					Profile
				</MenuItem>

				<MenuItem
					onClick={(e) => {
						e.preventDefault();
						auth.signOut();
						dispatch(setUser({}));
						setOpenHome(openHome);
						navigate('/');
					}}
				>
					Log out
				</MenuItem>
			</Menu>
		</>
	);
}

export default ProfileIcon;
