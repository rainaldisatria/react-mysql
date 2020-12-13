import './App.css';
import Axios from 'axios';
import React, { useState } from "react";

function App() {
  const [queryResult, setQueryResult] = useState([]); // Object that contain all of query result (SELECT * FROM anggota).
  const [columns, setColumns] = useState([]);  // Column name. 

  //#region 
  const [addFields, setAddFields] = useState([]);
  //#endregion

  const getQueryResult = () => {
    Axios.get("http://localhost:3001/employees", ).then((response) => {
      const newResponse = response.data;
      setQueryResult(newResponse);

      let newColumns = [];
      Object.keys(newResponse[0]).map((value, index) => {
        newColumns.push(value);
      }) 
      setColumns(newColumns);
    })
  }

  const insertQueryResult = (data) => {     
    Axios.post("http://localhost:3001/insert", {
      Id_Anggota: 'ANG-000',
      Nama: 'Rara',
      Alamat: 'Jakarta',
      Tempat_Lahir: 'Jakarta',
      Tgl_Lahir: 'saf',
      Jenis_Kelamin: 'Undefined',
      Pekerjaan: 'Doctor',
      No_Telephone: '08'
    }).then((response) => {
      console.log("success");
    })
  } 

  //#region Add 
  const onValueChanged = (event) => {

  }
  //#endregion 

  React.useEffect(() => {
    getQueryResult();
  }, [])

  return (
    <div className="App">
      <h1>Apotek Jakarta</h1> 
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
      <br></br>
      <h3>Add Anggota: </h3>
      {
        <form action="http://localhost:3001/insert" method="post">
        {columns.map((value, index) => {
          return (  
            <input name={value} placeholder={value}></input>
          )
        })}
        <button>Add Anggota</button>
        </form>
      }
    </div>
  );
}

export default App;
