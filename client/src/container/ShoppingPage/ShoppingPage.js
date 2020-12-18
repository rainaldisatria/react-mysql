import { Grid } from '@material-ui/core';
import React from 'react';
import ShoppingContent from '../../components/ShoppingComponents/ShoppingContent';
import ShoppingItem from '../../components/ShoppingComponents/ShoppingItem';

const ShoppingPage = () => {
    return (
        <Grid container direction={'column'}>
            <Grid item container>
                <Grid item xs={0} sm={2} />
                <Grid item xs={12} sm={8} >
                    <ShoppingContent /> 
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ShoppingPage;