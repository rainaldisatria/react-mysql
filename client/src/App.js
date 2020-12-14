import './App.css';
import Axios from 'axios';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from './store/actions';

function App(props) {
  const [addFields, setAddFields] = useState({}); 

  return (
    <div className="App">
      <h1>Apotek Jakarta</h1>
      <button onClick={this.props.fetchSelectedTable}>Intialize</button>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            { // Render table column name 
              this.props.columnsName.map((columnName, index) => {
                return <th key={index}>{columnName}</th>
              })}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {// Render table content  
            this.props.tableData.map((val, key) => {
              return (
                <tr key={key}>
                  {Object.keys(val).map((keyName, index) => {
                    return (<td key={key + " " + index}>{val[keyName]}</td>)
                  })}
                  <td>
                    <button onClick={() => this.props.deleteTable(this.props.columnsName[0], val[Object.keys(val)[0]])}>Edit</button>
                    <button onClick={() => this.props.deleteTable(this.props.columnsName[0], val[Object.keys(val)[0]])}>Delete</button>
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
          {this.props.columnsName.map((value, index) => {
            return (
              <input
                key={index}
                placeholder={value}
                onChange={(event) => {
                  const value = event.target.value;
                  setAddFields((prevValue) => {
                    return {
                      ...prevValue,
                      [this.props.columnsName[index]]: value,
                    }
                  })
                }}
              ></input>
            )
          })}
          <button onClick={(e) => {
            e.preventDefault();
            this.props.insertTotable(addFields);
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

export default connect(mapStateToPropos, mapToDispatch)(App);
