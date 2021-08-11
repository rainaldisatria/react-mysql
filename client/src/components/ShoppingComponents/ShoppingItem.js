import React, { useEffect, useState } from 'react';
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
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    textField: {
        maxWidth: '75px',
    }
})

const ShoppingItem = ({ title, description, price, id }) => {
    const classes = useStyles();
    const priceWithDot = price?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    const history = useHistory();

    const username = useSelector(store => store.username);
    const [quantity, setQuantity] = useState(1);
    const [maximumQuantity, setMaxQuantity] = useState();
    const [disabled, setDisabled] = useState(false);

    const addToCart = () => {
        if (username) {
            ServerAPI.addToCart(username, id, quantity).then(response => {
                return response;
            })
        }
        else{
            history.push('/login');
            sendNotification('Please log in first!', 'info', 2);
        }
    }

    useEffect(() => {
        ServerAPI.getJumlahPersediaan(id).then(response => {
            const maximumQuantity = response.data[0]?.['Jumlah_Sedia']; 

            if(!maximumQuantity){
                setDisabled(true);
            }
            else{
                setDisabled(false);

                setMaxQuantity(maximumQuantity);
                if (maximumQuantity < 1) {
                    setDisabled(true);
                }
            }
        })
    }, [id])

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="https://i.guim.co.uk/img/media/20491572b80293361199ca2fc95e49dfd85e1f42/0_240_5157_3094/master/5157.jpg?width=620&quality=85&auto=format&fit=max&s=769b733a241ddf213f4e32a96bc01c87"
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
                        if (value > maximumQuantity)
                            value = maximumQuantity;

                        setQuantity(value);
                    }}
                />
                <Button
                    disabled={disabled}
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