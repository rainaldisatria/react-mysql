import './App.css';
import Axios from 'axios';
import React, { useState } from "react";

function App() {
  const [queryResult, setQueryResult] = useState([]); // Object that contain all of query result (SELECT * FROM anggota).
  const [columns, setColumns] = useState([]);  // Column name.
  const [fields, setFields] = useState([]);

  const getQueryResult = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      const newResponse = response.data;
      setQueryResult(newResponse);
    })
  }

  const insertQueryResult = () => {
    Axios.post("http://localhost:3001/insert").then(() => {
      console.log("success");
    })
  }

  const getColumns = () => {
    let newColumns = [];
    Object.keys(queryResult[0]).map((value, index) => {
      newColumns.push(value);
    })

    setColumns(newColumns);
  }

  const saveChanges = (event) => {

  }

  const a = [
    ["John", "Highway"],
    ["Peter", "Lowstreet"]
  ]

  React.useEffect(() => {
    getQueryResult();
  }, [])

  return (
    <div className="App"> 
    {console.log(a)}
      <h1>Hello world</h1>
      <button onClick={getColumns}>Get columns</button>
      <button onClick={insertQueryResult}>Insert query</button>

      <table style={{ width: "100%" }}>
        <tr>
          { // Render table column name 
            columns.map((columnName, index) => {
              return <th>{columnName}</th>
            })}
        </tr>

        {// Render table content 
          queryResult.map((val, key) => {
            return (
              <tr>
                {Object.keys(val).map((keyName, index) => {
                  return <td contentEditable={true}>
                    {val[keyName]}
                  </td>
                })}
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}

export default App;
