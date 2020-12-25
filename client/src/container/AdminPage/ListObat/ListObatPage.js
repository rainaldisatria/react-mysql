import { Container, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EditableTable from '../../../components/EditableTable/EditableTable';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    }
})

const ListObatPage = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='md'>
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