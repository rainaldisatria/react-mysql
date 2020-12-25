import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    statusBox: {
        position: 'fixed',
        marginLeft: '60%',
    },
    subtitle: {
        maxWidth: '200px',
        margin: 'auto',
        marginTop: '16px',
    },
    icon: {
        width: '200px',
        height: '200px',
        margin: 'auto',
    }
}))

const AdminWelcomePage = () => {
    const classes = useStyles();

    return (
        <Grid container direction='column'>
            <div className={classes.appBarSpacer} />
            <Box fontWeight='fontWeightBold' textAlign='center' fontSize={32}>
                Welcome to admin page!
        </Box>
            <div className={classes.subtitle} />
            <Box textAlign='center' className=''>
                <Typography>What should I do...?</Typography>
            </Box> 
        </Grid>
    )
}

export default AdminWelcomePage;