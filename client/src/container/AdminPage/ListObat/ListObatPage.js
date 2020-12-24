import { Container, makeStyles } from '@material-ui/core';
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
        <Container component='main' maxWidth='xl'>
            <EditableTable tableName='tabel_obat' editable/>
        </Container>
    )
}

export default ListObatPage;