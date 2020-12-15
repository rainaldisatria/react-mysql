import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import AddRowToTable from '../AddRowToTable/AddRowToTable';
import Server from '../../Axios/Server';

const EditableTable = (props) => {
    const [tableData, setTableData] = useState([{ test: 'test', lala: 'lala' }]);

    const update = () => {
        Server.fetchTableData(props.tableName).then(res => setTableData(res.data));
    }

    const deleteHandler = (columnName, value) => {
        Server.deleteFromTable(props.tableName, columnName, value);
        console.log('deteled');
    }

    // Start
    useEffect(() => {
        update();
    }, [])

    let actionHeader = <th>Action</th>;

    let addButton = <AddRowToTable
        tableName={props.tableName}
        tableData={tableData}
        onClick={update}
    ></AddRowToTable>

    if (!props.Editable) {
        addButton = null;
        actionHeader = null;
    }

    return (
        <div>
            <h3>{props.tableName}</h3>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        { // Render table column name 
                            Object.keys(tableData[0]).map((columnName, index) => {
                                return <th key={index}>{columnName}</th>
                            })}
                        {actionHeader}
                    </tr>
                </thead>
                <tbody>
                    {// Render table content  
                        tableData.map((objectData, objId) => {
                            return (
                                <tr key={objId}>
                                    {Object.keys(objectData).map((keyName, index) => {
                                        return (<td key={objId + " " + index}>{objectData[keyName]}</td>)
                                    })}
                                    {
                                        props.Editable ?
                                            <td>
                                                {props.Editable}
                                                <button>Edit</button>
                                                <button onClick={() => {
                                                    const columnName = Object.keys(objectData)[0];
                                                    deleteHandler(columnName, objectData[columnName]);
                                                    update();
                                                }
                                                }>Delete</button>
                                            </td>
                                            : null
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {addButton}
        </div>
    )
}

export default EditableTable;