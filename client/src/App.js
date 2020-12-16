import './App.css';
import React from "react";
import EditMenu from './components/EditMenu/EditMenu';
import { Notification } from './components/Notification/Notification';
import AdminDashboard from './container/AdminDashboard/AdminDashboard';

function App() {
  return (
    <div className="App">
      {/*HOC*/}
      <Notification />
      <EditMenu></EditMenu>

      {/*Components*/}
      <h1>Apotek Jakarta</h1>
      <br></br>
      <AdminDashboard />
    </div>
  );
}

export default App;
