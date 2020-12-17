import './App.css';
import React from "react";
import { Notification } from './components/Notification/Notification';
import AdminDashboard from './container/AdminDashboard/AdminDashboard';
import LogInPage from './container/LoginPage/LoginPage';  
import Dashboard from './container/StatisticPage/Dashboard';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';

function App() {
  return (
    <div className="App">
      {/*HOC*/}
      <Notification />
      <Header />
      <LogInPage /> 
      <Dashboard />
      
      {/*Components*/} 
      <br></br>
      <AdminDashboard />

      <Footer />
    </div>
  );
}

export default App;
