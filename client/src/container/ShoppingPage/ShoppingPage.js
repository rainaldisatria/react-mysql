import { Grid } from '@material-ui/core';
import React from 'react';
import ShoppingContent from '../../components/ShoppingComponents/ShoppingContent';
import { makeStyles } from '@material-ui/core/styles/';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar
}))


const ShoppingPage = () => {
    const classes = useStyles()
    return (
        <>
        <div className={classes.appBarSpacer} />
        <div className={classes.appBarSpacer} />  
        <Grid container direction={'column'}>
            <Grid item container>
                <Grid item xs={0} sm={2} />
                <Grid item xs={12} sm={8} >
                    <ShoppingContent />
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}

export default ShoppingPage;