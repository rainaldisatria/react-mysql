import './App.css';
import React from "react";
import EditMenu from './components/EditMenu/EditMenu';
import { Notification } from './components/Notification/Notification';
import AdminDashboard from './container/AdminDashboard/AdminDashboard';
import LogInPage from './container/LoginPage/LoginPage';
import SignUpPage from './container/SignUpPage/SignUpPage';
import Chart from './container/StatisticPage/Chart';
import Dashboard from './container/StatisticPage/Dashboard';

function App() {
  return (
    <div className="App">
      {/*HOC*/}
      <Notification />
      <EditMenu></EditMenu>
      <Dashboard />
      <SignUpPage />
      <LogInPage />
      {/*Components*/}
      <h1>Apotek Jakarta</h1>
      <br></br>
      <AdminDashboard />
    </div>
  );
}

export default App;
