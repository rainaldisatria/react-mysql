import React from 'react';
import { AppBar, Button, Toolbar, Typography, makeStyles } from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

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
        flexGrow: 1,
    },
}));


const Header = () => {
    const classes = useStyles();

    let logIn = <Button className={classes.white}> Log In </Button>
    let admin = <Button className={classes.white}> Admin </Button>

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button className={classes.white}>
                        <LocalHospitalIcon className={classes.menuButton} />
                        <Typography>APOTEK JAKARTA </Typography>
                    </Button>

                    <Typography className={classes.space}></Typography>

                    {admin}
                    {logIn}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;