import { Container, CssBaseline, makeStyles, Typography, Box } from '@material-ui/core';
import React from 'react';
import Table from '../../../../components/Table/Table'

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
    },
}))

const PersediaanPage = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='md' className={classes.container}>
            <CssBaseline />
            <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
                Tabel Persediaan
            </Typography>
            <Table
                tableName='tabel_persediaan'
                editable
            />
        </Container>
    )
}

export default PersediaanPage;