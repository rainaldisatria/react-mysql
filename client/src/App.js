import './App.css';
import React from "react";
import * as actions from './store/actions';
import { useSelector, useDispatch } from 'react-redux';
import EditableTable from './components/EditableTable/EditableTable';
import AddRowToTable from './components/AddRowToTable/AddRowToTable';
import DatabaseList from './components/DatabaseLIst/DatabaseList';

function App() {
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.tableData);
  const columnsName = useSelector(state => state.columnsName);

  return (
    <div className="App">
      <h1>Apotek Jakarta</h1>
      <button onClick={() => dispatch(actions.fetchTables())}>Get List of tables</button>
      <button onClick={() => dispatch(actions.fetchSelectedTable())}>Intialize</button>
      <br></br>
      <br></br>
      <DatabaseList></DatabaseList>
      <br></br>
      <EditableTable
        tableData={tableData}
        columnsName={columnsName}
      ></EditableTable>
      <br></br>
      <AddRowToTable columnsName={columnsName}
      ></AddRowToTable>
    </div>
  );
}

export default App;
