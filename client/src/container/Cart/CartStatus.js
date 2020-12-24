import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardActions, Button, Box } from "@material-ui/core/";
import Paper from "@material-ui/core/Paper";
import { moneyFormat } from '../../Utility';

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

const CartStatus = ({ totalItem, totalHarga, buy, update }) => {
    const classes = useStyles();

    const username = useSelector(store => store.username);

    return (
        <>
            <Paper className={classes.paper}>
                <Box fontWeight='fontWeightBold'>
                    Cart Summary:
                    </Box>
                <Box>
                    Total Price: {moneyFormat(totalHarga)}
                </Box>

                <Button variant='contained' className={classes.button} color='primary'
                    onClick={() => {
                        buy(); 
                    }}>
                    Buy ({totalItem})
                </Button>
            </Paper>
        </>
    )
}

export default CartStatus;