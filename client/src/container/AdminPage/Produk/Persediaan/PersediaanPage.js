import { Container, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EditableTable from '../../../../components/EditableTable/EditableTable'

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
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Tabel Persediaan
            </Typography>
            <EditableTable
                tableName='tabel_persediaan'
                editable
            />
        </Container>
    )
}

export default PersediaanPage;