import Axios from 'axios';

const Server = {
    fetchTableData: (tableName) => {
        console.log('fetching table');
        return Axios.get(`http://localhost:3001/table/${tableName}`)
            .then(response => response)
            .catch(err => err)
    },
    insertIntoTable: (tableName, objectToAdd) => {
        console.log('insert');
        return Axios.post(`http://localhost:3001/insert/${tableName}`, objectToAdd)
            .then(response => { 
                return response;
            }).catch(err => err);
    },
    deleteFromTable: (tableName, columnName, value) => {
        console.log('delete');
        return Axios.post(`http://localhost:3001/delete/${tableName}`,
            {
                columnName: columnName,
                value: value,
            }).then(response => response)
            .catch(err => err);
    },
    fetchTablesData: () => {
        console.log('fetch tables');
        //[{"Tables_in_rumah_sakit":"log_perubahan"},
        //{"Tables_in_rumah_sakit":"obat_kadaluarsa"},{"Tables_in_rumah_sakit":"tabel_obat"},
        //{"Tables_in_rumah_sakit":"tabel_persediaan"},{"Tables_in_rumah_sakit":"tabel_transaksi"}]
        return Axios.get('http://localhost:3001/', {})
            .then(response => response)
            .catch(err => err);
    }
}

export default Server;