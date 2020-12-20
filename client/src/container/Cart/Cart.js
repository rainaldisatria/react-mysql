import React, { useEffect, useState } from 'react'
import ServerAPI from '../../Axios/ServerAPI';
import { useSelector } from 'react-redux';
import { AppBar, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
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
        <React.Fragment>
            <div className={classes.appBarSpacer} />

            <Grid container direction={'column'}>
                <Grid item container>
                    <Grid item xs={0} sm={2} />
                    <Grid item xs={12} sm={8} >
                        <Grid container diretion='row'>
                            <Grid container spacing={4}>
                                <Grid item sm={12}>
                                    <CartItem title='RHINNOS' description='Kaplet' />
                                </Grid>
                                <Grid item sm={12}>
                                    <CartItem title='RHINNOS' description='Kaplet' />
                                </Grid>
                                <Grid item sm={12}>
                                    <CartItem title='RHINNOS' description='Kaplet' />
                                </Grid>
                                <Grid item sm={12}>
                                    <CartItem title='RHINNOS' description='Kaplet' />
                                </Grid>
                                <Grid item sm={12}>
                                    <CartItem title='RHINNOS' description='Kaplet' />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <CartItem title='Status' description='Kaplet' />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Cart;