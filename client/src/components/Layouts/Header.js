import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography, makeStyles, fade, Menu, MenuItem, IconButton } from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStat } from '../../store/actions';
import ServerAPI from '../../Axios/ServerAPI';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
        edge: 'start',
    },
    white: {
        color: '#FFFFFF',
    },
    space: {
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '60%',
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(3),
            width: '40%',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        width: '100%',
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
    },
}));


const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const isAuthenticated = useSelector(store => store.authenticated);
    const username = useSelector(store => store.username);

    const [userType, setUserType] = useState('');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        dispatch(setLoginStat(false));
        history.push('/');
    }

    const myAccount = () => {
        history.push('/myaccount');
    }

    useEffect(() => {
        ServerAPI.fetchAccount(username)
            .then(response => {
                setUserType(response.data[0]?.userType);
            });
    }, [username])

    let logIn = null;
    let signUp = null;
    let admin = null;
    let cart = null;
    let myProfile = null;

    if (isAuthenticated) {
        if (userType === 'admin') {
            admin =
                <Link to='/admin'>
                    <Button className={classes.white}> Admin </Button>
                </Link>
        }
        cart =
            <Link to='/cart'>
                <Button className={classes.white}> Cart </Button>
            </Link>

        myProfile =
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                        myAccount();
                    }}>My account</MenuItem>

                    <MenuItem onClick={() => {
                        handleClose();
                        logOut();
                    }}>Log Out</MenuItem>
                </Menu>
            </div>

        logIn = null;
        signUp = null;
    }
    else {
        logIn =
            <Link to='/login'>
                <Button className={classes.white}> Log In </Button>
            </Link>;
        signUp =
            <Link to='/signup'>
                <Button className={classes.white}> Sign Up </Button>
            </Link>;

        myProfile = null;
    }

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar>
                    <Link to='/'>
                        <Button className={classes.white}>
                            <LocalHospitalIcon className={classes.menuButton} />
                            <Typography variant={'h6'}>APOTEK JAKARTA </Typography>
                        </Button>
                    </Link>

                    <div className={classes.root} />

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            fullWidth
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <div className={classes.root} />
                    {admin}

                    {signUp}
                    {logIn}

                    {cart}
                    {myProfile}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;