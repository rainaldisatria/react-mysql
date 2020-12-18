import { Grid } from '@material-ui/core';
import React from 'react';
import ShoppingItem from './ShoppingItem';

const ShoppingContent = () => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
                <ShoppingItem />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <ShoppingItem />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <ShoppingItem />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <ShoppingItem />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <ShoppingItem />
            </Grid> 
        </Grid>
    )
}

export default ShoppingContent;