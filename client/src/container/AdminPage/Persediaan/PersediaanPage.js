import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import EditableTable from '../../../components/EditableTable/EditableTable';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    }
})

const PersediaanPage = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='xl'>
            <EditableTable tableName='tabel_persediaan' editable/>
        </Container>
    )
}

export default PersediaanPage;