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

    const removeCart = (kodeObat) => {
        console.log('removed');
        const cartToBeRemoved = {
            username: username,
            kodeObat: kodeObat,
        }

        ServerAPI.removeCart(cartToBeRemoved)
            .then(response => {
                fetchCart();
                return response;
            })
    }

    const updateQuantityInDB = (kodeObat, newQuantity) => {
        const cartItemToBeModified = {
            username: username,
            kodeObat: kodeObat,
            quantity: newQuantity,
        }

        ServerAPI.setCartItemQuantity(cartItemToBeModified)
            .then(response => {
                // update cart status;

                console.log('updated');
                return response;
            });
    }

    useEffect(() => {
        fetchCart();
    }, [username]);

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.appBarSpacer} />

            <Grid container>
                <Grid item container xs={8}>
                    <Grid item direction={'column'} xs container spacing={3}>
                        {
                            cartFields?.map((objectData, objId) => {
                                return (
                                    <Grid key={objectData['kodeObat']} item xs>
                                        <CartItem
                                            prodName={`objectData['PROD NAME']`}
                                            id={objectData['kodeObat']}
                                            desc={`objectData['DESC']`}
                                            price={`objectData['HARGA']`}
                                            initialQuantity={objectData['quantity']}
                                            removeCart={removeCart}
                                            updateQuantityInDB={updateQuantityInDB}
                                        />
                                    </Grid>
                                )
                            })
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