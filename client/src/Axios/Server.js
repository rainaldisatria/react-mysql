import Axios from 'axios';

const Server = {
    fetchTableData: (tableName) => {
        return Axios.get(`http://localhost:3001/table/${tableName}`, {})
            .then(response => response)
    },
    insertIntoTable: (tableName, objectToAdd) => {
        return Axios.post(`http://localhost:3001/insert/${tableName}`, objectToAdd)
            .then(response => { 
                return response;
            });
    },
    deleteFromTable: (tableName, columnName, value) => {
        return Axios.post(`http://localhost:3001/delete/${tableName}`,
            {
                columnName: columnName,
                value: value,
            }).then(response => response);
    },
    fetchTablesData: () => {
        //[{"Tables_in_rumah_sakit":"log_perubahan"},
        //{"Tables_in_rumah_sakit":"obat_kadaluarsa"},{"Tables_in_rumah_sakit":"tabel_obat"},
        //{"Tables_in_rumah_sakit":"tabel_persediaan"},{"Tables_in_rumah_sakit":"tabel_transaksi"}]
        return Axios.get('http://localhost:3001/', {})
            .then(response => response);
    }
}

export default Server;