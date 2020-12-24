import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ServerAPI from '../../Axios/ServerAPI';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardActions, Button, TextField } from "@material-ui/core/";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from '@material-ui/icons/Delete';
import {moneyFormat} from '../../Utility';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
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
    textField: {
        maxWidth: '75px',
    }
}));

const CartItem = ({ id, initialQuantity, removeCart, updateQuantityInDB}) => {
    const classes = useStyles(); 

    const [data, setData] = useState();
    const [timeOut, setTimeOut] = useState(0);
    const [quantity, setQuantity] = useState(initialQuantity);
    const [maxQuantity, setMaxQuantity] = useState();

    const onChangeHandler = (e) => {
        let value = e.target.value;

        if(value < 1)
            value = 1;

        if(value > maxQuantity)
            value = maxQuantity;

        setQuantity(value);

        if(timeOut) {
            clearTimeout(timeOut);
        }

        setTimeOut(setTimeout(() => {
            updateQuantityInDB(id, value);
        }, 300))
    }

    
    const getMaxQuantity = () => {
        ServerAPI.getJumlahPersediaan(id).then(response => { 
            setMaxQuantity(response.data[0]?.['Jumlah_Sedia']);
        }) 
    }

    useEffect(() => {
        getMaxQuantity();
        ServerAPI.fetchObatData(id).then(response => { 
            setData(response.data[0]);
        })
    }, [id])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img
                                className={classes.img}
                                alt="complex"
                                src="data:image/jpeg;base64,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"
                            />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                    {data?.['Nama_Obat']}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {data?.['Bentuk_Obat']}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ID: {id}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Rp. {moneyFormat(data?.['Harga_Satuan'])}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <CardActions disableSpacing>
                    <div className={classes.expand}></div>
                    <Button onClick={() => removeCart(id)}>
                        <DeleteIcon />
                    </Button>
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
                        onChange={(e) => onChangeHandler(e)}
                    />
                </CardActions>
            </Paper>
        </div>
    )
}

export default CartItem;