import { Container, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EditableTable from '../../../../components/EditableTable/EditableTable'

const useStyles = makeStyles(theme => ({ 
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
    },
}))

const LogPerubahanPage = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='md' className={classes.container}>
            <CssBaseline /> 
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Log Perubahan
            </Typography>
            <EditableTable
                tableName='log_perubahan' 
            />
        </Container>
    )
}

export default LogPerubahanPage;