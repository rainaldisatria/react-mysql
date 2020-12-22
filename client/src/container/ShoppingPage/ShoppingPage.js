import { Container, CssBaseline, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import ShoppingContent from '../../components/ShoppingComponents/ShoppingContent';
import { makeStyles } from '@material-ui/core/styles/';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar
}))


const ShoppingPage = () => {
    const classes = useStyles()

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.appBarSpacer} />
            <div className={classes.appBarSpacer} />

            <Grid container>
                <Grid item >
                    <ShoppingContent />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ShoppingPage;