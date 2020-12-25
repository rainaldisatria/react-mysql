import { Container, CssBaseline, Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Table from '../../../../components/Table/Table';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
    },  
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
    },
    spacer: {
        paddingTop: theme.spacing(4),
    }
}))

const ListObatPage = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='md' className={classes.container}>
            <CssBaseline />
            <Typography component="h1" variant="h2" align="left" color="textPrimary">
                Tabel Obat
            </Typography>
            <Divider />
            <div className={classes.spacer} /> 
            <Table
                tableName='tabel_obat'
                editable
            />
        </Container>
    )
}

export default ListObatPage;