import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import * as actions from '../../store/actions'; 

const DatabaseList = () => {
    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables);

    return (
        <div>
            <button onClick={() => dispatch(actions.fetchTables())}>Fetch tables</button>
            {
                tables.map((dbName, id) => {
                    return (
                        <div key={dbName}>
                            <button
                                onClick={console.log('clicked')}>{dbName}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DatabaseList;