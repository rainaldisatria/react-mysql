import './App.css';
import React from "react";
import {Notification}  from './components/Notification/Notification';
import AdminDashboard from './container/AdminDashboard/AdminDashboard';
import LogInPage from './container/LoginPage/LoginPage';
import SignUpPage from './container/SignUpPage/SignUpPage';
import Dashboard from './container/StatisticPage/Dashboard';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import { Route, Switch } from 'react-router-dom';
import ShoppingPage from './container/ShoppingPage/ShoppingPage';
import { Grid } from '@material-ui/core'; 
import TopLoadingBar from './components/TopLoadingBar/TopLoadingBar';

function App() {
  let route = (
    <Switch>
      <Route path='/admin' exact component={AdminDashboard} />
      <Route path='/login' exact component={LogInPage} />
      <Route path='/signup' exact component={SignUpPage} />
      <Route path='/' component={ShoppingPage} />
    </Switch>
  ) 

  return (
    <div className="App"> 
      {/*HOC*/}
      <Notification />
      <TopLoadingBar />

      {/*COMPONENTS */}
      <Grid container direction='column'>
        <Grid item> <Header /> </Grid>
        <Grid item> {route} </Grid>
        <Grid item> <Footer /></Grid>
      </Grid>
    </div>
  );
}

export default App;
