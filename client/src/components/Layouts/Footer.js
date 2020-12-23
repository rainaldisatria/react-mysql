import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    content:{
        marginLeft: '30%',
    }
})

const Footer = () => {
    const classes = useStyles();

    return (
        <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link to='/' color="inherit">
                    Kelompok 4 PBDL UPNVJ
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <div className={classes.content}>
                <br />
                <Typography variant="body2" color="textSecondary" align="left"> 
                </Typography>
                <br />
                <br />
                <br />
            </div>
        </Box>
    );
}

export default Footer;