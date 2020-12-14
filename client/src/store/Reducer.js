import * as actionType from './actions.js';

const initialState = {
    table: '', // Selected Table
    tableData: [], // Selected table data
    columnsName: [], // Columns name of current selected table. 
}

// Tempat milah. Ditentuin sama nama action.
const reducer = (state = initialState, action) => {
    switch (action) {
        case actionType.ON_TABLE_SELECTED:
            return {
                ...initialState, 
            }
    }

    return state;
}   

export default reducer; 