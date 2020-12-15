import './App.css';
import React, { useEffect, useState } from "react";
import * as actions from './store/actions';
import { useSelector, useDispatch } from 'react-redux';
import EditableTable from './components/EditableTable/EditableTable';
import DatabaseList from './components/DatabaseLIst/DatabaseList';
import Server from './Axios/Server';

function App() {
  return (
    <div className="App">
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
