import React, { useEffect, useState } from 'react'
import ServerAPI from '../../Axios/ServerAPI';
import { useSelector } from 'react-redux';
import { AppBar, Container, CssBaseline, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
import ShoppingItem from '../../components/ShoppingComponents/ShoppingItem';
import CartItem from './CartItem';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    statusBox: {
        position: 'fixed',
        marginLeft: '60%',
    }
}))

const Cart = () => {
    const classes = useStyles();
    const username = useSelector(store => store.username);
    const [cartFields, setCartFields] = useState();

    const fetchCart = () => {
        ServerAPI.fetchCart(username)
            .then(res => {
                setCartFields(res.data);
            })
    }

    useEffect(() => {
        fetchCart();
    }, [username]);

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.appBarSpacer} />

            <Grid container>
                <Grid item container xs={6}>
                    <Grid item direction={'column'} xs container spacing={3}>
                        <Grid item xs>
                            <CartItem></CartItem>
                        </Grid>
                        <Grid item xs>
                            <CartItem></CartItem>
                        </Grid>
                        <Grid item xs>
                            <CartItem></CartItem>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container xs={4}>
                    <Grid item xs>
                        <CartItem></CartItem>
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    )
}

export default Cart;