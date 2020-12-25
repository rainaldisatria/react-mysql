import { Container, CssBaseline, Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Table from '../../../components/Table/Table';

const useStyles = makeStyles(theme => ({ 
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
    },
    spacer: {
        paddingTop: theme.spacing(4),
    }
}))

const OrdersPage = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='md' className={classes.container}>
            <CssBaseline /> 
            <Typography component="h1" variant="h2" align="left" color="textPrimary">
                Tabel Pesanan
            </Typography> 
            <Divider />
            <div className={classes.spacer} /> 
            <Table
                tableName='orders' 
            />
        </Container>
    )
}

export default OrdersPage;