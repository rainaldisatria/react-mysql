import React, { useEffect, useState } from 'react';
import Server from '../../Axios/ServerAPI';
import ServerAPI from '../../Axios/ServerAPI';

const AddRowToTable = (props) => {
    const [addFields, setAddFields] = useState({});
    const [columnNames, setColumnNames] = useState([]);

    useEffect(() => {
        ServerAPI.fetchTableDesc(props.tableName).then(response => {
            setColumnNames(response.data);
        })
    }, []) 

    return (
        <div>
            <h4>Add To Table: </h4>
            <form>
                {
                    columnNames ?
                        columnNames.map((columnName, index) => {
                            return (
                                <input
                                    key={index}
                                    placeholder={columnName.Field}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setAddFields((prevValue) => {
                                            return {
                                                ...prevValue,
                                                [columnName.Field]: value,
                                            }
                                        })
                                    }}
                                ></input>
                            )
                        }) : null
                }
                <button onClick={(e) => {
                    e.preventDefault();
                    Server.insertIntoTable(props.tableName, addFields).then(res => {
                        props.onClick();
                    });
                }}>Add</button>
            </form>
        </div>
    )
}

export default AddRowToTable;