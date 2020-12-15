import './App.css';
import React from "react"; 
import EditableTable from './components/EditableTable/EditableTable';
import DatabaseList from './components/DatabaseLIst/DatabaseList'; 
import Modal from 'react-modal';

function App() {
  return (
    <div className="App">
      <Modal>

      </Modal>
      <h1>Apotek Jakarta</h1>
      <br></br>
      <DatabaseList></DatabaseList>
      <br></br>
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
