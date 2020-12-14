import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import * as actions from '../../store/actions';
import Axios from 'axios';

const DatabaseList = () => {
    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables);

    return (
        <div>
            {
                tables.map((dbName, id) => {
                    return (
                        <div key={dbName}>
                            <button
                                onClick={() => {
                                    dispatch(actions.selectTablesSync(dbName))
                                    Axios.post('http://localhost:3001/selectTable', dbName).then(response => {
                                        console.log('clicked');
                                    })
                                }}>{dbName}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DatabaseList;