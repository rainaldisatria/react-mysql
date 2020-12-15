import Server from '../Axios/Server';

//#region Sync methods 
export const fetchTablesSync = (tables) => {
    return {
        type: FETCH_TABLES,
        payload: tables,
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
//#endregion