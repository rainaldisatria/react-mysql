import React, { useEffect, useState } from 'react'
import ServerAPI from '../../Axios/ServerAPI';
import { useSelector } from 'react-redux';
import { AppBar, Container, CssBaseline, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
import CartItem from './CartItem';
import CartStatus from './CartStatus';

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

    let cartList = null;
    if(cartList){
        cartList = cartFields?.map((objectData, objId) => {
            return (
                <Grid item xs>
                    <CartItem
                        prodName={objectData['kodeObat']}
                        id={objectData['kodeObat']}
                        desc={objectData['kodeObat']}
                        price={objectData['kodeObat']}
                    />
                </Grid>
            )
        })
    }

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.appBarSpacer} />

            <Grid container>
                <Grid item container xs={8}>
                    <Grid item direction={'column'} xs container spacing={3}>
                        {
                            cartList
                        }
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <CartStatus></CartStatus>
                </Grid>
            </Grid>

        </Container>
    )
}

export default Cart;