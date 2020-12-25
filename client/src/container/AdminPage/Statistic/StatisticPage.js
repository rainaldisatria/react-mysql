import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Deposits from '../Deposits';
import Orders from '../Orders';
import clsx from 'clsx';
import Chart from '../Chart';
import EditableTable from '../../../components/EditableTable/EditableTable'

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const StatisticPage = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return <Container maxWidth="lg" className={classes.container}>
    <div className={classes.appBarSpacer} />

    <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
      Ringkasan Penjualan
      </Typography>

    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>

      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposits />
        </Paper>
      </Grid>

      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Januari
          </Typography>
          <EditableTable
            tableName='view_januari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Februari
          </Typography>
          <EditableTable
            tableName='view_februari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Maret
          </Typography>
          <EditableTable
            tableName='view_maret'
          />
        </Paper>
      </Grid>
    </Grid>
  </Container>
}

export default StatisticPage;