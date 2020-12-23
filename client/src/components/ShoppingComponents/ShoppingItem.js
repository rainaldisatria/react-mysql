import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box, TextField } from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import ServerAPI from '../../Axios/ServerAPI';
import sendNotification from '../Notification/Notification';

const useStyles = makeStyles({
    textField: {
        maxWidth: '75px',
    }
})

const ShoppingItem = ({ title, description, price, id }) => {
    const classes = useStyles();
    const priceWithDot = price?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

    const username = useSelector(store => store.username);
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        ServerAPI.addToCart(username, id, quantity).then(response => {
            return response;
        })
    } 

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="https://bulelengkab.go.id/assets/instansikab/70/artikel/mengenal-obat-gangguan-jiwa-dan-penggunaannya-56.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        Obat berbentuk {description}
                    </Typography>
                    <Box fontWeight='fontWeightBold'>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Rp. {priceWithDot}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <TextField className={classes.textField}
                    size='small'
                    variant='outlined'
                    id="standard-number"
                    label="Quantity"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={quantity}
                    onChange={e => {
                        let value = e.target.value;
                        if (value < 1)
                            value = 1;

                        setQuantity(value);
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addToCart}
                >
                    Add To Cart
                </Button>
            </CardActions>
        </Card>

    )
}

export default ShoppingItem;