import React, { useEffect, useState } from 'react';
import AddRowToTable from '../AddRowToTable/AddRowToTable';
import Server from '../../Axios/ServerAPI';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import Notification from '../Notification/Notification'
import { Button } from '@material-ui/core';

const EditableTable = ({ tableName, editable, showHeader }) => {
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([{}]);

    // Start
    useEffect(() => {
        update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const update = () => {
        Server.fetchTableData(tableName).then(res => { setTableData(res.data) })
    }

    const editHandler = (defaultData) => {
        dispatch(actions.setEditModal(true, defaultData, tableName, update));
    }

    const deleteHandler = (columnName, value) => {
        Server.deleteFromTable(tableName, columnName, value).then(res => {
            update();
        })
    }
    let actionHeader = <th>Action</th>;

    let addButton = <AddRowToTable
        tableName={tableName}
        onClick={update}
    ></AddRowToTable>

    if (tableData.length <= 0) {
        actionHeader = <th>Empty Table</th>
    }

    if (!editable) {
        addButton = null;
        actionHeader = null;
    }

    return (
        <div>
            {showHeader ? <h3>{tableName}</h3> : null}
            <table style={{ width: "100%", textAlign: 'center' }}>
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
                                            editable ?
                                                <td>
                                                    <Button
                                                        color='primary'
                                                        style={{ width: '50%' }}
                                                        onClick={() => {
                                                            editHandler(objectData);
                                                        }}>Edit</Button>
                                                    <Button
                                                        color='primary'
                                                        style={{ width: '50%' }}
                                                        onClick={() => {
                                                            const columnName = Object.keys(objectData)[0];
                                                            deleteHandler(columnName, objectData[columnName]);
                                                        }
                                                        }>Delete</Button>
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