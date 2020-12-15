import React, { useState } from 'react';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Server from '../../Axios/Server';

const AddRowToTable = (props) => {
    const dispatch = useDispatch();

    const [addFields, setAddFields] = useState({}); 

    return (
        <div>
            <h3>Add To Table: </h3>
            <form>
                {Object.keys(props.tableData[0]).map((columnName, index) => {
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
                })}
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