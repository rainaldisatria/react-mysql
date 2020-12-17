import './App.css';
import React from "react";
import { Notification } from './components/Notification/Notification';
import AdminDashboard from './container/AdminDashboard/AdminDashboard';
import LogInPage from './container/LoginPage/LoginPage';     
import SignUpPage from './container/SignUpPage/SignUpPage';    
import Dashboard from './container/StatisticPage/Dashboard';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer'; 
import {Route, Switch} from 'react-router-dom';
import ShoppingPage from './container/ShoppingPage/ShoppingPage';

function App() {
  let route = (
    <Switch>
      <Route path='/admin' exact component={LogInPage} />
      <Route path='/login' exact component={LogInPage} />
      <Route path='/signup' exact component={SignUpPage} />
      <Route path='/' component={ShoppingPage} />
    </Switch>
  )

  return (
    <div className="App">
      {/*HOC*/}
      <Notification />
      <Header />  
      {route}
      <Footer />
    </div>
  );
}

export default App;
