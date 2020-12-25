import { Container, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EditableTable from '../../../../components/EditableTable/EditableTable';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
    },  
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
    },
}))

const ListObatPage = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='md' className={classes.container}>
            <CssBaseline />
            <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
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