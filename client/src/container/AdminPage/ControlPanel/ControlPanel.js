import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import EditableTable from '../../../components/EditableTable/EditableTable'; 

const useStyles = makeStyles({
    content:{
        flexGrow: 1,
    },
})

const ControlPanel = () => {
    const classes = useStyles();

    return (
        <Container className={classes.content} maxWidth='xl'> 
            <h1>Admin Dashboard</h1>
            <EditableTable
                tableName={'log_perubahan'}
                showHeader
            ></EditableTable>
            <EditableTable
                editable
                tableName={'obat_kadaluarsa'}
                showHeader
            ></EditableTable>
            <EditableTable
                editable
                tableName={'tabel_obat'}
                showHeader
            ></EditableTable>
            <EditableTable
                editable
                tableName={'tabel_persediaan'}
                showHeader
            ></EditableTable>
        </Container>
    )
}

export default ControlPanel;