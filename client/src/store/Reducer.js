import * as actionType from './actions.js';

const initialState = {
    table: '', // Selected Table
    tableData: [], // Selected table data
    columnsName: [], // Columns name of current selected table. 
}

// Tempat milah. Ditentuin sama nama action.
const reducer = (state = initialState, action) => {
    switch (action) {
        case actionType.FETCH_SELECTED_TABLE:
            const newTableData = action.payload;
            const newColumnsName = Object.keys(newTableData[0]).map(val => val)

            return {
                ...initialState, 
                tableData: newTableData,
                columnsName: newColumnsName,
            }
    }

    return state;
}   

export default reducer; 