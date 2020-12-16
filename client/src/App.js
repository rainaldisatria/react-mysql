import './App.css';
import React from "react";
import EditableTable from './components/EditableTable/EditableTable';
import EditMenu from './components/EditMenu/EditMenu';
import {Notification} from './components/Notification/Notification';

function App() {
  return (
    <div className="App">
      {/*HOC*/}
      <Notification />
      <EditMenu></EditMenu>  
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
