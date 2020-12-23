import { Grid } from '@material-ui/core';
import React from 'react';
import ShoppingItem from './ShoppingItem';

const ShoppingContent = ({ items }) => {
    return (
        <Grid container spacing={4}>
            {
                items.map((objectData, objId) => {
                    return (
                        <Grid key={objId} item xs={12} sm={12} md={4}>
                            <ShoppingItem
                                title={objectData['Nama_Obat']} 
                                description={objectData['Bentuk_Obat']} 
                                price={objectData['Harga_Satuan']}
                                />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default ShoppingContent;