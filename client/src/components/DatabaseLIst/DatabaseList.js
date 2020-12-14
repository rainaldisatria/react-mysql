import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

const DatabaseList = () => {
    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables);

    return (
        <div>
            {
                tables.map((dbName, id) => {
                    return (
                        <div>
                            <button key={dbName}>{dbName}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DatabaseList;