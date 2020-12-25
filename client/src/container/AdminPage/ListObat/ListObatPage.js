import { Container, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EditableTable from '../../../components/EditableTable/EditableTable';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
    },
    appBarSpacer: {
        appBarSpacer: theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))

const ListObatPage = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='md' className={classes.container}>
            <CssBaseline />
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Tabel Obat
            </Typography>
            <EditableTable
                tableName='tabel_obat'
                editable
            />
        </Container>
    )
}

export default ListObatPage;