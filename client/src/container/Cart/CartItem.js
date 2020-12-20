import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ServerAPI from '../../Axios/ServerAPI';
import { makeStyles } from '@material-ui/core/styles'; 
import Card from '@material-ui/core/Card'; 
import CardMedia from '@material-ui/core/CardMedia'; 
import CardActions from '@material-ui/core/CardActions'; 
import Typography from '@material-ui/core/Typography'; 
import {Grid, Button} from '@material-ui/core/';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 550
    },
    media: {
        marginLeft: 20,
        marginRight: 15,
        marginTop: 5,
        height: 100,
        width: 100
    },
    expand: {
        marginLeft: "auto",
    },
    content: {
        marginTop: 15,
    }
}));

const CartItem = () => {
    const classes = useStyles();

    const username = useSelector(store => store.username);
    const [cartData, setCartData] = useState();

    useEffect(() => {
        ServerAPI.fetchCart(username).then(response => {
            setCartData(response.data);
        })
    }, [username])

    return (
        <Card className={classes.root}>
            <Grid container direction={"column"}>
                <Grid item container className={classes.content}>
                    <Grid item>
                        <CardMedia
                            className={classes.media}
                            image="https://bulelengkab.go.id/assets/instansikab/70/artikel/mengenal-obat-gangguan-jiwa-dan-penggunaannya-56.jpg"
                            title="Paella dish"
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">RHINNOS</Typography>
                        <Typography variant="subtitle1">Harga: Rp. 20.000,00.</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <CardActions disableSpacing>
                <Button
                    className={classes.expand}
                >
                    <DeleteIcon />
                    <Typography variant="h6"> REMOVE </Typography>
                </Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;