import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import Axios from 'axios';

const EditableTable = (props) => {
    const dispatch = useDispatch(); 

    return (
        <table style={{ width: "100%" }}>
            <thead>
                <tr>
                    { // Render table column name 
                        props.columnsName.map((columnName, index) => {
                            return <th key={index}>{columnName}</th>
                        })}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {// Render table content  
                    props.tableData.map((val, key) => {
                        return (
                            <tr key={key}>
                                {Object.keys(val).map((keyName, index) => {
                                    return (<td key={key + " " + index}>{val[keyName]}</td>)
                                })}
                                <td>
                                    <button onClick={() => dispatch(actions.deleteFromSelectedTable(props.columnsName[0], val[Object.keys(val)[0]]))}>Edit</button>
                                    <button onClick={() => dispatch(actions.deleteFromSelectedTable(props.columnsName[0], val[Object.keys(val)[0]]))}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default EditableTable;