import './App.css';
import React, {useEffect} from "react";
import { Notification } from './components/Notification/Notification';
import AdminDashboard from './container/AdminDashboard/AdminDashboard';
import LogInPage from './container/LoginPage/LoginPage';
import SignUpPage from './container/SignUpPage/SignUpPage';
import Dashboard from './container/StatisticPage/Dashboard';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import { Route, Switch } from 'react-router-dom';
import ShoppingPage from './container/ShoppingPage/ShoppingPage';
import { Grid, makeStyles } from '@material-ui/core';
import TopLoadingBar from './components/TopLoadingBar/TopLoadingBar';
import { useDispatch } from 'react-redux';
import {autoLogIn} from './store/actions';
import Cart from './container/Cart/Cart';
import MyAccount from './container/MyAccount/MyAccount';
import NotFoundPage from './container/NotFoundPage/NotFoundPage';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  
}))

function App() {
  const classes = useStyles();
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(autoLogIn())
  }, [])

  let route = (
    <Switch>
      <Route path='/myaccount' exact component={MyAccount} />
      <Route path='/cart' exact component={Cart} />
      <Route path='/admin' exact component={AdminDashboard} />
      <Route path='/login' exact component={LogInPage} />
      <Route path='/signup' exact component={SignUpPage} />
      <Route path='/' exact component={ShoppingPage} />
      <Route path='/' component={NotFoundPage} />
    </Switch>
  )

  return (
    <div className="App">
      {/*HOC*/}
      <Notification />
      <TopLoadingBar />

      {/*COMPONENTS */}
      <Grid container direction='column'>
        <Grid item className={classes.appBarSpacer}> <Header /> </Grid>
        <Grid item> {route} </Grid>
        <Grid item> <Footer /></Grid>
      </Grid>
    </div >
  );
}

export default App;
