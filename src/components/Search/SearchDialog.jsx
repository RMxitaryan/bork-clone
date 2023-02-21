import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { createUseStyles } from 'react-jss';
import Search from '@mui/icons-material/Search';
import { List } from '@mui/material';
import { selectCard, selectSearch } from '../../redux/user/selector';
import { useSelector } from 'react-redux';
import { Card } from '../Cards/Card';
import { v4 as uuidv4 } from 'uuid';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = createUseStyles({
	appBar: {
		backgroundColor: '#3a3333',
	},
	searchBar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchBarLeft: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		flex: 3,
	},
	searchBarRight: {},
	searchTitle: {
		flex: 1,
	},
	searchInputTyp: {
		flex: 2,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchInput: {
		borderRadius: '25px',
		border: 'none',
		height: '35px',
		width: '100%',
		maxWidth: 500,
		padding: '15px',
	},
	searchIcon: {
		marginLeft: 5,
		width: 40,
		height: 40,
		padding: 5,
	},
	searchCloseBtn: {
		width: 40,
		height: 40,
		padding: 5,
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.3)',
			borderRadius: '50%',
			cursor: 'pointer',
		},
	},
	list: {
		backgroundColor: '#3a3333',

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
	},
});
function FullScreenDialog({
	open,
	handleClose,
	key,
	openHome,
	handleSignUpClose,
	handleSignUpClickOpen,
	handleSignInClickOpen,
	handleSignInClose,
}) {
	const [inputValue, setInputValue] = useState('');
	const search = useSelector(selectSearch);
	const classes = useStyles();

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
				className={classes.dialog}
			>
				<AppBar sx={{ position: 'relative' }} className={classes.appBar}>
					<Toolbar className={classes.searchBar}>
						<div className={classes.searchBarLeft}>
							<Typography
								variant="h6"
								component="div"
								className={classes.searchTitle}
							>
								Search
							</Typography>

							<Typography
								style={{ display: 'block' }}
								variant="h6"
								component="div"
								className={classes.searchInputTyp}
							>
								<input
									type="text"
									value={inputValue}
									onChange={(e) => {
										setInputValue(e.target.value);
									}}
									className={classes.searchInput}
								/>
								<Search className={classes.searchIcon} />
							</Typography>
						</div>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							className={classes.searchBarRight}
						>
							<CloseIcon className={classes.searchCloseBtn} />
						</IconButton>
					</Toolbar>
				</AppBar>
				<List className={classes.list}>
					{search.map((item) => {
						if (inputValue.length > 0) {
							if (item.name.includes(inputValue)) {
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
							}
						} else {
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
						}
					})}
				</List>
			</Dialog>
		</div>
	);
}
export default FullScreenDialog;
