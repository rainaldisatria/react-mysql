import Server from '../Axios/Server';

//#region Sync methods 
export const fetchTablesSync = (tables) => {
    return {
        type: FETCH_TABLES,
        payload: tables,
    }
}

export const setEditModal = (status, data, tableName) => {
    return {
        type: SET_EDIT_MODAL,
        status: status,
        defaultData: data,
        tableName: tableName,
    }
} 
//#endregion Sync methods

//#region Async methods
export const fetchTables = () => {
    return (dispatch) => {
        Server.fetchTablesData().then(response => {
            dispatch(fetchTablesSync(response.data));
        }) 
    }
}    
//#endregion

//#region Actions name 
export const FETCH_TABLES = "FETCH_TABLES"; // Initialize list of tables in this db. 

export const SET_EDIT_MODAL = "SET_EDIT_MODAL";
export const OPEN_EDIT_MODAL = "OPEN_EDIT_MODAL";
//#endregion