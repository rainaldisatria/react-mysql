import * as actionType from './actions.js';

const initialState = {
    tables: [], // List of all Tables   
}

const reducer = (state = initialState, action) => {
    switch (action.type) { 
        case actionType.FETCH_TABLES:
            const tableNames = action.payload.map((val, key) => {
                return val[Object.keys(val)[0]];
            }) 

            return {
                ...state,
                tables: tableNames,
            } 
 
        default:
            return state;
    } 
}   

export default reducer; 