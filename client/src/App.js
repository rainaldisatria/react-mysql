import './App.css';
import Axios from 'axios';
import React, { useState } from "react";

function App() {
  const [queryResult, setQueryResult] = useState([]); // Object that contain all of query result (SELECT * FROM anggota).
  const [columns, setColumns] = useState([]);  // Column name. 

  //#region 
  const [addFields, setAddFields] = useState({});
  //#endregion

  const getQueryResult = () => {
    Axios.get("http://localhost:3001/anggota",).then((response) => {
      setQueryResult(response.data);

      let newColumns = [];
      Object.keys(response.data[0]).map((value, index) => {
        return newColumns.push(value);
      })
      setColumns(newColumns); 
    }).catch((error) => {
      console.log(error);
    })
  }

  const deleteTable = (columnName, value) => {  
    Axios.post("http://localhost:3001/delete",
      {
        columnName: columnName,
        value: value
      }
    ).then((response) => { 
      getQueryResult();
    }) 
    
  }

  const insertQueryResult = (e) => {
    e.preventDefault();
 
    Axios.post("http://localhost:3001/insert", addFields).then((response) => {
      getQueryResult();
    }) 
  } 

  return (
    <div className="App">
      <h1>Apotek Jakarta</h1>
      <button onClick={getQueryResult}>Intialize</button>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            { // Render table column name 
              columns.map((columnName, index) => {
                return <th key={index}>{columnName}</th>
              })}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {// Render table content  
            queryResult.map((val, key) => {
              return (
                <tr key={key}>
                  {Object.keys(val).map((keyName, index) => {
                    return (<td key={key + " " + index}>{val[keyName]}</td>)
                  })}
                  <td>
                    <button onClick={() => deleteTable(columns[0], val[Object.keys(val)[0]])}>Edit</button>
                    <button onClick={() => deleteTable(columns[0], val[Object.keys(val)[0]])}>Delete</button>
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
          {columns.map((value, index) => {
            return (
              <input
                key={index}
                placeholder={value}
                onChange={(event) => {
                  const value = event.target.value;
                  setAddFields((prevValue) => {
                    return {
                      ...prevValue,
                      [columns[index]]: value
                    }
                  })
                }}
                value={addFields[columns[index]]}
              ></input>
            )
          })}
          <button onClick={(e) => insertQueryResult(e)}>Add Anggota</button>
        </form>
      }
    </div>
  );
}

export default App;
