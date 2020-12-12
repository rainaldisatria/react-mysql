import './App.css';
import Axios from 'axios';
import { useState } from "react";

function App() {
  const [queryResult, setQueryResult] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      const newResponse = response.data;
      setQueryResult(newResponse);
    })
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <button onClick={getEmployees}>Get Employee</button>
      {queryResult.map((val, id) => {
        return Object.keys(val).map((keyName, index) => {
          return <div>
            <p>{keyName}: {val[keyName]}</p>
          </div>
        })
      })}
    </div>
  );
}

export default App;
