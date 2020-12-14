import Axios from 'axios';

export const fetchSelectedTableSync = (tableData) => {
    return {
        type: FETCH_SELECTED_TABLE,
        payload: tableData,
    }
}

export const fetchTablesSync = (tables) => {
    return {
        type: FETCH_TABLES,
        payload: tables,
    }
}

//#region Async methods
export const fetchTables = () => {
    return (dispatch) => {
        Axios.get('http://localhost:3001/').then((response) => {
            dispatch(fetchTablesSync(response.data));
        })
    }
}

export const selectTablesSync = (tableName) => {
    return {
        type: SELECT_TABLE,
        payload: tableName,
    }
}

export const fetchSelectedTable = () => {
    return (dispatch) => {
        Axios.get("http://localhost:3001/getTable",).then((response) => {
            dispatch(fetchSelectedTableSync(response.data));
        }).catch((error) => {
            console.log(error);
        })
    }
}

export const deleteFromSelectedTable = (columnName, value) => {
    return (dispatch) => {
        Axios.post("http://localhost:3001/delete",
            {
                columnName: columnName,
                value: value
            }
        ).then((response) => {
            dispatch(fetchSelectedTable());
        })
    }
}

export const insertToSelectedTable = (objectToAdd) => {
    return (dispatch) => {

        Axios.post("http://localhost:3001/insert", objectToAdd).then((response) => {
            dispatch(fetchSelectedTable());
        })
    }
}
//#endregion

//#region Actions name 
export const FETCH_TABLES = "FETCH_TABLES"; // Initialize list of tables in this db.
export const SELECT_TABLE = "SELECT_TABLES"; // Initialize selected table.
export const FETCH_SELECTED_TABLE = "FETCH_SELECTED_TABLE";   // Get column and row of selected table

//#endregion