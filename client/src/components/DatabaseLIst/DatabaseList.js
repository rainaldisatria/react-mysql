import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import * as actions from '../../store/actions';

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
                                onClick={() => dispatch(actions.selectTablesSync(dbName))}>{dbName}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DatabaseList;