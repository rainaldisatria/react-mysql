import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EditableTable from '../../../components/EditableTable/EditableTable';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1, 
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: {
        appBarSpacer: theme.mixins.toolbar,
    },
}))

const ControlPanel = () => {
    const classes = useStyles();

    return (
        <Container className={classes.content} maxWidth='lg' componenent='main'> 
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Control Panel
            </Typography>
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