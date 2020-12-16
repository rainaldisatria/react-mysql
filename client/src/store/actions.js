import Server from '../Axios/ServerAPI';

//#region Sync methods 
export const fetchTablesSync = (tables) => {
    return {
        type: FETCH_TABLES,
        payload: tables,
    }
}

export const diasbleEditModal = () => {
    return {
        type: DISABLE_EDIT_MODAL,
    }
}

export const setEditModal = (status, defaultData, tableName, callback) => {
    return {
        type: SET_EDIT_MODAL,
        status: status,
        defaultData: defaultData,
        tableName: tableName,  
        callback: callback,
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
export const DISABLE_EDIT_MODAL = "DISABLE_EDIT_MODAL";
//#endregion