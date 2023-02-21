import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
const useStyles = createUseStyles({
	menuCatalog: {
		zIndex: 10,
		backgroundColor: '#4E4440',
		translateX: 'translateX(0)',
		position: 'absolute',
		left: '0',
		top: '0',
		margin: '0',
		width: '400px',
		height: '100vh',
		transition: 'transform .3s ease,-webkit-transform .3s ease',
		boxSizing: 'inherit',
		opacity: '0.8',
		backgroundImage: 'url (./img.kitchen.jpg)',
	},
	headerMenu: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: '35px',
		minWidth: '320px',
		height: '60px',
	},
	closeMenuIcon: {
		position: 'relative',
		flex: '0 0 50px',
		width: '50px',
		height: '50px',
		color: 'transparent',
		fontSize: '0',
	},
	mainMenu: { overflowY: 'auto' },
	menuItems: {
		width: '250px',
		margin: '10px 10px 20px',
		padding: '0 20px',
		listStyleType: 'none',
		display: 'block',
		marginBlockStart: '1em',
		marginBlockEnd: '1em',
		marginInlineStart: '0px',
		marginInlineEnd: '0px',
		paddingInlineStart: '40px',
	},
	li: {
		display: 'list-item',
		textAlign: '-webkit-match-parent',
		cursor: 'pointer',
	},
	link: {
		display: 'block',
		padding: '15px 0',
		color: '#fff',
		fontSize: '18px',
		fontFamily: 'Akzidenz,Helvetica,Arial,sans-serif',
		letterSpacing: '.04em',
		textTransform: 'uppercase',
		textDecoration: 'none',
		outline: '0',
		backgroundColor: 'transparent',
		textDecoration: 'none',
		paddingLeft: 10,
		'&:hover': {
			backgroundColor: '#9A9999',
			color: '#3A3333',
			paddingLeft: 10,
		},
	},
	backIcon: {
		margin: '20px',
		color: 'white',
		cursor: 'pointer',
		position: 'relative',
		width: '30px',
		height: '30px',
	},
});
const MenuBar = ({ isOpenMenu, setIsOpenMenu }) => {
	const classes = useStyles();
	const onCloseMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};
	return (
		<div className={classes.menuCatalog}>
			<div className={classes.headerMenu}>
				<div className={classes.closeMenuIcon} onClick={onCloseMenu}>
					<ArrowBackIosIcon className={classes.backIcon} />
				</div>
			</div>
			<div className={classes.mainMenu}>
				<ul className={classes.menuItems}>
					<li>
						<Link to="kitchen" onClick={onCloseMenu} className={classes.link}>
							Kitchen
						</Link>
					</li>
					<li>
						<Link
							to="homeAndClimat"
							onClick={onCloseMenu}
							className={classes.link}
						>
							Home & climat
						</Link>
					</li>
					<li>
						<Link
							to="healthAndBeauty"
							onClick={onCloseMenu}
							className={classes.link}
						>
							Health & beauty
						</Link>
					</li>
					<li>
						<Link to="borkHome" onClick={onCloseMenu} className={classes.link}>
							Bork home
						</Link>
					</li>
					<li>
						<Link
							to="accessories"
							onClick={onCloseMenu}
							className={classes.link}
						>
							accessories
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default MenuBar;
