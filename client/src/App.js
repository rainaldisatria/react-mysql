import './App.css';
import React from "react";
import EditableTable from './components/EditableTable/EditableTable';
import EditMenu from './components/EditMenu/EditMenu';

function App() {
  return (
    <div className="App">
      <EditMenu></EditMenu>
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
