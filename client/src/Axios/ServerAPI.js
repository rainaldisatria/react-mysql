import Axios from 'axios';

import sendNotification from '../components/Notification/Notification';
import { continuousStart, complete } from '../components/TopLoadingBar/TopLoadingBar';

const Server = {
    //#region Shopping
    getJumlahPersediaan: (id) => {
        return Axios.post('http://localhost:3001/fetchJumlahPersediaan', {kodeObat: id})
        .then(response => {
            if (response.data.sqlMessage) {
                sendNotification(response.data.sqlMessage, 'error', 5);
            } 

            return response;
        })
    },

    fetchCartData: (username) => {
        return Axios.post('http://localhost:3001/fetchCartData', username)
        .then(response => {
            if (response.data.sqlMessage) {
                sendNotification(response.data.sqlMessage, 'error', 5);
            } 

            return response;
        })
    },

    fetchObatData: (id) => {
        return Axios.post('http://localhost:3001/fetchObatData', id).then(response => {
            if (response.data.sqlMessage) {
                sendNotification(response.data.sqlMessage, 'error', 5);
            } 

            return response;
        })
    },

    setCartItemQuantity: (cartItemToBeModified) => {
        return Axios.post('http://localhost:3001/setCartItemQuantity', cartItemToBeModified)
        .then(response => {
            if (response.data.sqlMessage) {
                sendNotification(response.data.sqlMessage, 'error', 5);
            } 

            return response;
        })
    },

    removeCart: (cartToBeRemoved) => {
        return Axios.post('http://localhost:3001/removeCartItem', cartToBeRemoved)
            .then(response => {
                if (response.data.sqlMessage) {
                    sendNotification(response.data.sqlMessage, 'error', 5);
                }
                else {
                    sendNotification('Item removed!', 'success', 2);
                }
                
                return response;
            })
    },

    addToCart: (username, kodeObat, quantity) => {
        return Axios.post('http://localhost:3001/addToCart', {
            username: username,
            kodeObat: kodeObat,
            quantity: quantity,
        }).then(response => {
            if (response.data.sqlMessage) {
                sendNotification(response.data.sqlMessage, 'error', 5);
            }
            else {
                sendNotification('Added to cart!', 'success', 2);
            }
            return response;
        })
    },

    fetchObat: () => {
        continuousStart();
        return Axios.get('http://localhost:3001/fetchObat')
            .then(response => {
                if (response.data.sqlMessage) {
                    sendNotification(response.data.sqlMessage, 'error', 2);
                }

                complete();
                return response;
            })
            .catch(error => {
                complete();
                return error;
            })
    },
    fetchCart: (username) => {
        continuousStart();
        return Axios.post('http://localhost:3001/fetchCart', username)
            .then(response => {
                if (response.data.sqlMessage) {
                    sendNotification(response.data.sqlMessage, 'error', 2);
                }

                complete();
                return response;
            }).catch(err => {
                complete();
                return err;
            })
    },
    //#endregion

    //#region Authenthication 
    signup: (signupFields) => {
        continuousStart();
        return Axios.post('http://localhost:3001/signup', signupFields)
            .then(response => {
                if (response.data.sqlMessage) {
                    if (response.data.sqlMessage.startsWith('Duplicate')) {
                        sendNotification('username already exist', 'error', 2);
                    }
                }
                else {
                    sendNotification(`Registration Success! Please Log In!`, 'success', 2);
                }
                complete();
                return response;
            }).catch(err => {
                sendNotification('Could not connect to database', 'error', 2);
                complete();
            })
    },
    login: (username, password) => {
        continuousStart();
        return Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then(response => {
            if (response.data.sqlMessage) {
                sendNotification(response.data.sqlMessage, 'error', 2);
            }
            complete();
            return response;
        }).catch(err => {
            sendNotification('Could not connect to database', 'error', 2);
            complete();
        })
    },
    //#endregion

    //#region Account
    fetchAccount: (username) => {
        return Axios.post('http://localhost:3001/fetchAccount', username)
            .then(response => {
                return response;
            })
    },
    //#endregion    

    //#region Database Management (CRUD)
    fetchTableData: (tableName) => {
        return Axios.get(`http://localhost:3001/table/${tableName}`)
            .then(response => {
                if (response.data.sqlMessage) {
                    sendNotification(response.data.sqlMessage, 'error', 2);
                }
                return response
            })
    },
    fetchTablesData: () => {
        //[{"Tables_in_rumah_sakit":"log_perubahan"},
        //{"Tables_in_rumah_sakit":"obat_kadaluarsa"},{"Tables_in_rumah_sakit":"tabel_obat"},
        //{"Tables_in_rumah_sakit":"tabel_persediaan"},{"Tables_in_rumah_sakit":"tabel_transaksi"}]
        return Axios.get('http://localhost:3001/', {})
            .then(response => {
                if (response.data.sqlMessage) {
                    sendNotification(response.data.sqlMessage, 'error', 2);
                }
                return response
            })
    },
    fetchTableDesc: (tableName) => {
        return Axios.get(`http://localhost:3001/desc/${tableName}`, {})
            .then(response => {
                if (response.data.sqlMessage) {
                    sendNotification(response.data.sqlMessage, 'error', 2);
                }
                return response
            })
    },
    insertIntoTable: (tableName, objectToAdd) => {
        return Axios.post(`http://localhost:3001/insert/${tableName}`, objectToAdd)
            .then(response => {
                if (response.data.sqlMessage) {
                    sendNotification(response.data.sqlMessage, 'error', 2);
                }
                else {
                    sendNotification(`Insert OK. ${response.data.affectedRows} row(s) inserted`, 'success', 1)
                }
                return response;
            })
    },
    deleteFromTable: (tableName, columnName, value) => {
        return Axios.post(`http://localhost:3001/delete/${tableName}`,
            {
                columnName: columnName,
                value: value,
            }).then(response => {
                console.log(response);
                sendNotification(`Delete OK. ${response.data.affectedRows} row(s) affected`, 'success', 1)
                return response;
            })
    },
    editTableFields: (tableName, editedObject, whereTo) => {
        return Axios.post(`http://localhost:3001/update/${tableName}`,
            {
                editedObject: editedObject,
                whereTo: whereTo,
            }).then(response => {
                sendNotification(`Edit OK. ${response.data.affectedRows} row(s) affected`, 'success', 1)
                return response;
            })
    }
    //#endregion
}

export default Server;