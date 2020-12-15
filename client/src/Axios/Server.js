import Axios from 'axios';

const Server = {
    fetchTableData: (tableName) => {
        console.log('fetching table');
        return Axios.get(`http://localhost:3001/table/${tableName}`)
            .then(response => response)
    },
    insertIntoTable: (tableName, objectToAdd) => {
        console.log('insert');
        return Axios.post(`http://localhost:3001/insert/${tableName}`, objectToAdd)
            .then(response => response)
    },
    deleteFromTable: (tableName, columnName, value) => {
        return Axios.post(`http://localhost:3001/delete/${tableName}`,
            {
                columnName: columnName,
                value: value,
            }).then(response => response)
    },
    fetchTablesData: () => {
        console.log('fetch tables');
        //[{"Tables_in_rumah_sakit":"log_perubahan"},
        //{"Tables_in_rumah_sakit":"obat_kadaluarsa"},{"Tables_in_rumah_sakit":"tabel_obat"},
        //{"Tables_in_rumah_sakit":"tabel_persediaan"},{"Tables_in_rumah_sakit":"tabel_transaksi"}]
        return Axios.get('http://localhost:3001/', {})
            .then(response => response)
    }
}

export default Server;