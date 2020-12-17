import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

export default props =>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color='inherit'>
                <LocalHospitalIcon />
                Apotek Jakarta
            </Typography> 
        </Toolbar>
    </AppBar>