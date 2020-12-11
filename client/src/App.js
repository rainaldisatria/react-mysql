import './App.css';
import Axios from 'axios';
import { useState } from "react";

function App() {
  const [query, setQuery] = useState([]);
  const [test , setTest] = useState(null);

  const getEmployees = () => {
    console.log("clicked");
    Axios.get("http://localhost:3001/employees").then((response) => {
      const newQuery = response.data;
      setQuery(newQuery);
    })

    updateResult();
  }

  let result = test;

  const updateResult = () => {
    console.log("update result called");
    setTest(<div> Test</div>);
  }

  return (
    <div className="App"> 
      {result}
      <h1>Hello world</h1>
      <button onClick={getEmployees}>Get Employee</button>
      <button onClick={updateResult}>Show Employees</button>
    </div>
  );
}

export default App;
