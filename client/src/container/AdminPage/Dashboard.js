import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminDrawer from './AdminDrawer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { Switch, Route } from 'react-router-dom';
import ListObatPage from './ListObat/ListObatPage';
import PersediaanPage from './Persediaan/PersediaanPage';
import { Button } from '@material-ui/core';
import AlertDialogSlide from './DialogTest';
import EditMenu from '../../components/EditMenu/EditMenu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const content = () => {
    return <div>
      Welcome to admin dashboard
    </div>
  }

  let statistik = () => {
    return <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
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
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  }

  let route =
    <Switch>
      <Route path='/admin/listObat' exact component={ListObatPage} />
      <Route path='/admin/persediaanObat ' exact component={PersediaanPage} />
      <Route path='/admin/statistik' exact component={statistik} />
      <Route path='/admin/logPerubahan' exact component={AlertDialogSlide} />
      <Route path='/admin/' exact component={content} />
    </Switch>


  return (
    <div className={classes.root}> 
      <EditMenu></EditMenu>
      <CssBaseline />
      <Button onClick={() => {

      }}>TETS</Button>
      <AdminDrawer />
      {route}
    </div>
  );
}