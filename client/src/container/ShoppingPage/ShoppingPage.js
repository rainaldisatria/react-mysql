import { Container, CssBaseline, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ShoppingContent from '../../components/ShoppingComponents/ShoppingContent';
import { makeStyles } from '@material-ui/core/styles/';
import ServerAPI from '../../Axios/ServerAPI';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar
}))


const ShoppingPage = () => {
    const classes = useStyles()
    const [items, setItems] = useState([{}]); 

    useEffect(() => {
        ServerAPI.fetchObat().then(response => {
            setItems(response.data);
        })
    }, []) 

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.appBarSpacer} />
            <div className={classes.appBarSpacer} />

            <Grid container>
                <Grid item >
                    <ShoppingContent items={items}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ShoppingPage;