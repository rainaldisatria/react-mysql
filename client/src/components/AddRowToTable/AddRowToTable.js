import React, { useState } from 'react';
import Server from '../../Axios/Server';

const AddRowToTable = (props) => {
    const [addFields, setAddFields] = useState({});

    return (
        <div>
            <h4>Add To Table: </h4>
            <form>
                {
                    props.tableData[0] ?
                    Object.keys(props.tableData[0]).map((columnName, index) => {
                        return (
                            <input
                                key={columnName}
                                placeholder={columnName}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setAddFields((prevValue) => {
                                        return {
                                            ...prevValue,
                                            [columnName]: value,
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