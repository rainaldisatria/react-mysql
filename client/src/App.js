import './App.css';
import React from "react";
import EditableTable from './components/EditableTable/EditableTable';
import EditMenu from './components/EditMenu/EditMenu';
import sendNotification, {Notification} from './components/Notification/Notification';

function App() {
  return (
    <div className="App">
      {/*HOC*/}
      <Notification />
      <EditMenu></EditMenu> 
      <button onClick={() => sendNotification("Inserted", "success", 1)}>Send notification</button>
      {/*Component*/}
      <h1>Apotek Jakarta</h1>
      <br></br>
      <EditableTable
        tableName={'log_perubahan'}
      ></EditableTable>
      <EditableTable
        Editable
        tableName={'obat_kadaluarsa'}
      ></EditableTable>
      <EditableTable
        Editable
        tableName={'tabel_obat'}
      ></EditableTable>
      <EditableTable
        Editable
        tableName={'tabel_persediaan'}
      ></EditableTable>
    </div>
  );
}

export default App;
