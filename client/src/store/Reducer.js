import * as actionType from './actions.js';

const initialState = {
    tables: [], // List of all Tables
    table : '',
    tableData: [], // Selected table data
    columnsName: [], // Columns name of current selected table. 
}

// Tempat milah. Ditentuin sama nama action.
const reducer = (state = initialState, action) => {
    switch (action.type) { 
        case actionType.FETCH_TABLES:
            //[{"Tables_in_rumah_sakit":"log_perubahan"},{"Tables_in_rumah_sakit":"obat_kadaluarsa"},{"Tables_in_rumah_sakit":"tabel_obat"},{"Tables_in_rumah_sakit":"tabel_persediaan"},{"Tables_in_rumah_sakit":"tabel_transaksi"}]
            const tableNames = action.payload.map((val, key) => {
                return val[Object.keys(val)[0]];
            })

            console.log(tableNames);

            return {
                ...state,
                tables: tableNames,
            }
            
        case actionType.SELECT_TABLE:
            
            return {
                ...state,
                table: action.payload,
            }

        case actionType.FETCH_SELECTED_TABLE:
            const newTableData = action.payload;
            const newColumnsName = Object.keys(newTableData[0]).map(val => val)
            console.log("fetching selected table");
            return {
                ...state, 
                tableData: newTableData,
                columnsName: newColumnsName,
            }
        default:
            return state;
    } 
}   

export default reducer; 