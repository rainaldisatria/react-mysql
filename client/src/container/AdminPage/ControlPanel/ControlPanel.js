import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Table from '../../../components/Table/Table';

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
            <Typography component="h1" variant="h2" align="Left" color="textPrimary" gutterBottom>
                Control Panel
            </Typography>
            <Table
                tableName={'log_perubahan'}
                showHeader
                editable
            ></Table>
            <Table
                editable
                tableName={'obat_kadaluarsa'}
                showHeader
            ></Table>
            <Table
                editable
                tableName={'tabel_obat'}
                showHeader
            ></Table>
            <Table
                editable
                tableName={'tabel_persediaan'}
                showHeader
            ></Table>
        </Container>
    )
}

export default ControlPanel;