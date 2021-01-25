import { Container, makeStyles, Typography, Divider } from '@material-ui/core';
import React from 'react';
import Table from '../../../components/Table/Table';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
    },
    text:{
        marginTop: '30px',
    },
    divider:{
        width: '250px',
    }
}))

const ControlPanel = () => {
    const classes = useStyles();

    return (
        <Container className={classes.content} maxWidth='lg' componenent='main'>
            <Typography component="h1" variant="h2" align="left" color="textPrimary">
                Control Panel
            </Typography>

            <Divider />
            <Typography component="h1" variant="h4" align="left" color="textPrimary" className={classes.text}>
                A. OBAT-OBAT
            </Typography>
            <Divider component="hr" className={classes.divider} />
            <Table
                editable
                tableName={'tabel_obat'}
                showHeader
            ></Table>
<Divider />
            <Table
                editable
                tableName={'obat_kadaluarsa'}
                showHeader
            ></Table>
<Divider />
            <Table
                editable
                tableName={'tabel_persediaan'}
                showHeader
            ></Table>
<Divider />
            <Table
                tableName={'log_perubahan'}
                showHeader
                editable
            ></Table>
<Divider />
            <Typography component="h1" variant="h4" align="left" color="textPrimary" className={classes.text} >
                B. Transaksi
            </Typography>
            <Divider component="hr" className={classes.divider} />

            <Table
                tableName={'tabel_transaksi'}
                showHeader
                editable
            ></Table>
<Divider />
            <Table
                tableName={'orders'}
                showHeader
                editable
            ></Table>

            <Typography component="h1" variant="h4" align="left" color="textPrimary" className={classes.text} >
                C. USERS
            </Typography>
            <Divider component="hr" className={classes.divider} />

            <Table
                tableName={'users'}
                showHeader
                editable
            ></Table>
<Divider />
            <Table
                tableName={'cart'}
                showHeader
                editable
            ></Table>
        </Container>
    )
}

export default ControlPanel;