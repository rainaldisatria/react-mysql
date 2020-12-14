import Axios from 'axios'; 

export const fetchSelectedTableSync = (tableData) => {
    return {
        type: FETCH_SELECTED_TABLE,
        payload: tableData,
    }
}

//#region Async methods
export const fetchSelectedTable = () => {
    return (dispatch) => {
        Axios.get("http://localhost:3001/getTable",).then((response) => {
            const tableDatas = response.data;
            dispatch(fetchSelectedTable(tableDatas));
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
export const REQUEST_SELECTED_TABLE = "REQUEST_SELECTED_TABLE";

export const FETCH_SELECTED_TABLE = "FETCH_SELECTED_TABLE";
export const ADD_TO_SELECTED_TABLE = 'ADD_TO_SELECTED_TABLE';
export const DELETE_FROM_SELECTED_TABLE = 'DELETE_FROM_SELECTED_TABLE';
//#endregion