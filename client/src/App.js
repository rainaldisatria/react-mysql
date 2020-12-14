import './App.css';
import React, { useState } from "react";
import { connect } from 'react-redux';
import * as actions from './store/actions';
import { useSelector, useDispatch } from 'react-redux';

function App(props) {
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.tableData);
  const columnsName = useSelector(state => state.columnsName);

  const [addFields, setAddFields] = useState({});

  return (
    <div className="App">
      <h1>Apotek Jakarta</h1>
      <button onClick={() => dispatch(actions.fetchSelectedTable())}>Intialize</button>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            { // Render table column name 
              columnsName.map((columnName, index) => {
                return <th key={index}>{columnName}</th>
              })}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {// Render table content  
            tableData.map((val, key) => {
              return (
                <tr key={key}>
                  {Object.keys(val).map((keyName, index) => {
                    return (<td key={key + " " + index}>{val[keyName]}</td>)
                  })}
                  <td>
                    <button onClick={() => dispatch(actions.deleteFromSelectedTable(columnsName[0], val[Object.keys(val)[0]]))}>Edit</button>
                    <button onClick={() => dispatch(actions.deleteFromSelectedTable(columnsName[0], val[Object.keys(val)[0]]))}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <br></br>
      <h3>Add Anggota: </h3>
      {
        <form>
          {columnsName.map((value, index) => {
            return (
              <input
                key={index}
                placeholder={value}
                onChange={(event) => {
                  const value = event.target.value;
                  setAddFields((prevValue) => {
                    return {
                      ...prevValue,
                      [columnsName[index]]: value,
                    }
                  })
                }}
              ></input>
            )
          })}
          <button onClick={(e) => {
            e.preventDefault();
            dispatch(actions.insertToSelectedTable(addFields))
          }}>Add</button>
        </form>
      }
    </div>
  );
}

const mapStateToPropos = (stateFromStore) => {
  return {
    tableData: stateFromStore.tableData,
    columnsName: stateFromStore.columnsName,
  }
}

const mapToDispatch = (dispatch) => {
  return {
    deleteTable: (columnName, value) => dispatch(actions.deleteFromSelectedTable(columnName, value)),
    insertToTable: (objectToAdd) => dispatch(actions.insertToSelectedTable(objectToAdd)),
    fetchSelectedTable: () => dispatch(actions.fetchSelectedTable()),
  }
}

export default App;
