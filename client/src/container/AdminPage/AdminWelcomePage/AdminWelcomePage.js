import { Box, Button, Grid, makeStyles, Typography, Container, Avatar } from '@material-ui/core';
import React from 'react';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

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
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(32),
    },
    avatar: {
        margin: 'auto',
        backgroundColor: theme.palette.secondary.main,
        width: '250px',
        height: '250px',
        marginBottom: theme.spacing(8),
    },
}))

const AdminWelcomePage = () => {
    const classes = useStyles();

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Grid container direction='column'>
                <div className={classes.appBarSpacer} /> 
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon style={{fontSize: 200}}/>
                </Avatar>
                <Box fontWeight='fontWeightBold' textAlign='center' fontSize={32}>
                    Welcome to admin page!
                </Box>
                <div className={classes.subtitle} />
                <Box textAlign='center' className=''>
                    <Typography>What should I do...?</Typography>
                </Box>
            </Grid>
        </Container>
    )
}

export default AdminWelcomePage;