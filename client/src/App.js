import './App.css';
import Axios from 'axios';
import React, { useState } from "react";

function App() {
  const [queryResult, setQueryResult] = useState([]); // Object that contain all of query result (SELECT * FROM anggota)
  const [columns, setColumns] = useState([]);  // Column name
  const [tableData, setTableData] = useState([]);

  const getQueryResult = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      const newResponse = response.data;
      setQueryResult(newResponse);
      console.log(queryResult);
    })
  }

  const getColumns = () => {
    let newColumns = [];
    Object.keys(queryResult[0]).map((value, index) => {
      newColumns.push(value);
    })

    setColumns(newColumns);
    console.log(columns);
  }

  const getTableData = () => {
    let newTableData = [];

    queryResult.map((object, index) => {
      newTableData.push(object);
    })
  }

  React.useEffect(() => {
    getQueryResult();
  }, [])

  return (
    <div className="App">
      <h1>Hello world</h1>
      <button onClick={getColumns}>Get columns</button>
      <button onClick={getTableData}>Get table data</button>

      <table style={{ width: "100%" }}>
        <tr>
          { // Render table column name
            columns.map((columnName, index) => {
              return <th>{columnName}</th>
            })}
        </tr>

        {// Render table content 
          queryResult.map((val, key) => {
            return <tr>
              {Object.keys(val).map((keyName, index) => {
                return <td>
                  {val[keyName]}
                </td>
              })}
            </tr>
          })
        }
      </table>
    </div>
  );
}

export default App;
