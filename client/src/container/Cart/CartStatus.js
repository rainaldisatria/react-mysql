import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ServerAPI from '../../Axios/ServerAPI';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardActions, Button, Box } from "@material-ui/core/";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    },
    expand: {
        marginLeft: "auto"
    },
    button: {
        width: '100%',
        height: '50px',
        marginTop: '32px',
    }
}));

const CartStatus = () => {
    const classes = useStyles();

    const username = useSelector(store => store.username);
    const [cartData, setCartData] = useState();

    useEffect(() => {
        ServerAPI.fetchCart(username).then(response => {
            setCartData(response.data);
        })
    }, [username])

    return (
        <>
            <Paper className={classes.paper}>
                <Box fontWeight='fontWeightBold'>
                    Ringkasan Belanja:
                    </Box>
                <Box>
                    Total Harga: Rp. 250.000
                    </Box>

                <Button variant='contained' className={classes.button} color='primary'>
                    Beli (2)
                </Button>
            </Paper>
        </>
    )
}

export default CartStatus;