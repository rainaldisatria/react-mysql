import './App.css';
import React from "react";
import { Notification } from './components/Notification/Notification';
import AdminDashboard from './container/AdminDashboard/AdminDashboard';
import LogInPage from './container/LoginPage/LoginPage';
import SignUpPage from './container/SignUpPage/SignUpPage'; 
import Dashboard from './container/StatisticPage/Dashboard';
import {Header, Footer} from './components/Layouts/';

function App() {
  return (
    <div className="App">
      {/*HOC*/}
      <Notification />
      <Header />
      <LogInPage />
      
      //<Dashboard />
      //<SignUpPage />
      
      {/*Components*/}
      <h1>Apotek Jakarta</h1>
      <br></br>
      <AdminDashboard />

      <Footer />
    </div>
  );
}

export default App;
