import React, { useState } from 'react';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const AddRowToTable = (props) => {
    const dispatch = useDispatch();

    const [addFields, setAddFields] = useState({});
    const columnsName = useSelector(state => state.columnsName)

    return (
        <div>
            <h3>Add To Table: </h3>
            <form>
                {columnsName.map((value, index) => {
                    return (
                        <input
                            key={index}
                            placeholder={value}
                            onChange={(event) => {
                                const value = event.target.value;
                                setAddFields((prevValue) => {
                                    return {
                                        ...prevValue,
                                        [columnsName[index]]: value,
                                    }
                                })
                            }}
                        ></input>
                    )
                })}
                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch(actions.insertToSelectedTable(addFields))
                }}>Add</button>
            </form>
        </div>
    )
}

export default AddRowToTable;