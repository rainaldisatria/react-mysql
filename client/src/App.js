import './App.css';
import React from "react";
import * as actions from './store/actions';
import { useSelector, useDispatch } from 'react-redux';
import EditableTable from './components/EditableTable/EditableTable';
import AddRowToTable from './components/AddRowToTable/AddRowToTable';

function App() {
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.tableData);
  const columnsName = useSelector(state => state.columnsName);

  return (
    <div className="App">
      <h1>Apotek Jakarta</h1>
      <button onClick={() => dispatch(actions.fetchSelectedTable())}>Intialize</button>
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
