import Server from '../Axios/ServerAPI';

const authenticationStatFileName = 'authenticationStat';
const usernameStatFileName = 'usernameStat';

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

export const autoLogIn = () => {
    const authenticationStat = localStorage.getItem(authenticationStatFileName);
    const usernameStat = localStorage.getItem(usernameStatFileName);
    return dispatch => {
        if (authenticationStat && usernameStat) {
            dispatch(setLoginStat(authenticationStat, usernameStat));
        }
        else {
            dispatch(setLoginStat(false));
        }
    }
}

export const setLoginStat = (condition, username) => {
    if (condition) {
        localStorage.setItem(authenticationStatFileName, true);
        localStorage.setItem(usernameStatFileName, username);
    }
    else {
        localStorage.removeItem(authenticationStatFileName);
        localStorage.removeItem(usernameStatFileName);
    }

    return {
        type: SET_LOGIN_STAT,
        condition: condition,
        username: username,
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

export const SET_LOGIN_STAT = "SET_LOGIN_STAT";

export const SET_EDIT_MODAL = "SET_EDIT_MODAL";
export const DISABLE_EDIT_MODAL = "DISABLE_EDIT_MODAL";
//#endregion