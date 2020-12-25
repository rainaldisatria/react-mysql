import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminDrawer from './AdminDrawer'; 
import { Switch, Route } from 'react-router-dom';
import ListObatPage from './ListObat/ListObatPage'; 
import EditMenu from '../../components/EditMenu/EditMenu';
import StatisticPage from './Statistic/StatisticPage';
import AdminWelcomePage from './AdminWelcomePage/AdminWelcomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ControlPanel from './ControlPanel/ControlPanel';

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

export default function AdminDashboard() {
  const classes = useStyles();

  let route =
    <Switch>
      <Route path='/admin/listObat' exact component={ListObatPage} /> 
      <Route path='/admin/statistik' exact component={StatisticPage} /> 
      <Route path='/admin/controlpanel' exact component={ControlPanel} />
      <Route path='/admin/' exact component={AdminWelcomePage} />
      <Route path='/admin/' component={NotFoundPage} />
    </Switch>


  return (
    <div className={classes.root}>
      <CssBaseline />
      <EditMenu></EditMenu>
      <AdminDrawer />
      {route}
    </div>
  );
}