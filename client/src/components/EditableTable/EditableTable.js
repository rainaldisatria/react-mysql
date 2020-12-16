import React, { useEffect, useState } from 'react';
import AddRowToTable from '../AddRowToTable/AddRowToTable';
import Server from '../../Axios/Server';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const EditableTable = (props) => {
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([{}]);

    // Start
    useEffect(() => {
        update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const update = () => {
        Server.fetchTableData(props.tableName).then(res => { setTableData(res.data) })
    }

    const editHandler = (defaultData) => {
        dispatch(actions.setEditModal(true, defaultData, props.tableName));
    }

    const deleteHandler = (columnName, value) => {
        Server.deleteFromTable(props.tableName, columnName, value).then(res => {
            update();
        })
    }
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
                            tableData[0] ?
                                Object.keys(tableData[0]).map((columnName, index) => {
                                    return <th key={index}>{columnName}</th>
                                })
                                : null
                        }
                        {actionHeader}
                    </tr>
                </thead>
                <tbody>
                    {// Render table content  
                        tableData ?
                            tableData.map((objectData, objId) => {
                                return (
                                    <tr key={objId}>
                                        {
                                            objectData ?
                                            Object.keys(objectData).map((keyName, index) => {
                                                return (<td key={objId + " " + index}>{objectData[keyName]}</td>)
                                            })
                                            : null
                                        }
                                        {
                                            props.Editable ?
                                                <td>
                                                    <button onClick={() => {
                                                        editHandler(objectData);
                                                    }}>Edit</button>
                                                    <button onClick={() => {
                                                        const columnName = Object.keys(objectData)[0];
                                                        deleteHandler(columnName, objectData[columnName]);
                                                    }
                                                    }>Delete</button>
                                                </td>
                                                : null
                                        }
                                    </tr>
                                )
                            }) : null
                    }
                </tbody>
            </table>
            {addButton}
        </div>
    )
}

export default EditableTable;