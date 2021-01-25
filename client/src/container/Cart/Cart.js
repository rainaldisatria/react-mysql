import React, { useEffect, useState } from 'react'
import ServerAPI from '../../Axios/ServerAPI';
import { useSelector } from 'react-redux';
import { Box, Button, Container, CssBaseline, Grid, makeStyles, Typography } from '@material-ui/core';
import CartItem from './CartItem';
import CartStatus from './CartStatus';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import sendNotification from '../../components/Notification/Notification';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    statusBox: {
        position: 'fixed',
        marginLeft: '60%',
    },
    mulaiBelanjaButton: {
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

const Cart = () => {
    const classes = useStyles();
    const history = useHistory();
    const username = useSelector(store => store.username);
    const [cartFields, setCartFields] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [isHidden, setIsHidden] = useState('true');

    const fetchCartData = () => {
        ServerAPI.fetchCartData(username).then(res => {
            const data = res.data;
            setCartData(data);
            return res;
        })
    }

    const fetchCart = () => {
        ServerAPI.fetchCart(username).then(res => {
            const data = res.data;
            setCartFields(data);
            return res;
        })
    }

    const update = () => {
        fetchCart();
        fetchCartData();
    }

    const buy = () => {
        cartFields.map((objData, objId) => {
            ServerAPI.fetchObatData(objData.kodeObat).then(response => {
                const obatData = response.data[0];
                console.log(obatData);
                const data = {
                    ...obatData,
                    quantity: objData.quantity,
                }

                ServerAPI.buy(username, data)
                    .then(response => {
                        update();
                        sendNotification('Pembelian mu berhasil!', 'success', 2);
                        return response;
                    })
            })


        })
    }

    //#region Cart Item
    const removeCart = (kodeObat) => {
        const cartToBeRemoved = {
            username: username,
            kodeObat: kodeObat,
        }

        ServerAPI.removeCart(cartToBeRemoved)
            .then(response => {
                update();
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
                update();

                return response;
            });
    }
    //#endregion

    let cartList =
        <Grid container direction='column'>
            <RemoveShoppingCartIcon className={classes.icon} />
            <Box fontWeight='fontWeightBold' textAlign='center' fontSize={32}>
                Wah, keranjang belanjamu kosong
        </Box>
            <div className={classes.appBarSpacer} />
            <Box textAlign='center' className=''>
                <Typography>Daripada dianggurin, mending isi dengan barang-barang impianmu. Yuk, cek sekarang!</Typography>
            </Box>
            <Box className={classes.mulaiBelanjaButton}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        history.push('/');
                    }}>
                    Mulai Belanja
            </Button>
            </Box>
        </Grid>

    if (cartFields.length > 0 && cartData.length > 0) {
        console.log(cartFields.length);
        cartList = <Grid container>
            <Grid item container xs={8}>
                <Grid item direction={'column'} xs container spacing={3}>
                    {
                        cartFields.map((objectData, objId) => { 
                            {console.log(objectData['quantity'])}
                            return (
                                <Grid key={objectData['kodeObat']} item xs>
                                    <CartItem
                                        id={objectData['kodeObat']}
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
                <CartStatus
                    totalItem={cartData[1][0]['totalItem']}
                    totalHarga={cartData[0][0]['totalHarga']}
                    buy={buy}
                    update={update}
                ></CartStatus>
            </Grid>
        </Grid>
    }

    useEffect(() => {
        setTimeout(() => {
            setIsHidden(false);
        }, 100)
    })

    useEffect(() => {
        update();
    }, [username]);

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.appBarSpacer} />
            {isHidden ? null : cartList}
        </Container >
    )
}

export default Cart;