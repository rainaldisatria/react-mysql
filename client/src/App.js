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

function App() {
  let route = (
    <Switch>
      <route path='/' exact component={LogInPage} />
      <route path='/login' exact component={LogInPage} />
      <route path='/signup' exact component={SignUpPage} />
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
