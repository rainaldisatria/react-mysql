import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import Server from '../../Axios/Server';

Modal.setAppElement('#root');

const EditMenu = (props) => {
    const dispatch = useDispatch();

    const tableName = useSelector(state => state.tableName);
    const editModal = useSelector(state => state.editModal);

    // {Kode_Obat: "SRSCF1723", Nama_Obat: "SUCRALFATE", Bentuk_Obat: "Syrup", 
    // Tgl_Produksi: "2017-03-22T17:00:00.000Z", Tgl_Kadaluarsa: "2023-03-19T17:00:00.000Z", …}
    const defaultData = useSelector(state => state.defaultData);

    //[{"Field":"Kode_Obat","Type":"varchar(10)","Null":"NO","Key":"PRI","Default":null,"Extra":""},
    const [tableDesc, setTableDesc] = useState([{}]);

    let modalContent = (
        <div>
            <h1>Edit Value</h1>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        {
                            tableDesc ?
                                Object.keys(tableDesc[0]).map((columnName, colId) => {
                                    return (
                                        <th key={colId}>
                                            {columnName}
                                        </th>
                                    )
                                }) : null
                        }
                        <th>
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        defaultData ?
                            Object.keys(defaultData).map((dataName, dataID) => {
                                return (

                                    tableDesc[dataID] ?
                                        <tr>
                                            {
                                                Object.keys(tableDesc[dataID]).map((descName, descId) => {
                                                    return (
                                                        <td>{tableDesc[dataID][descName]}</td>
                                                    )
                                                })
                                            }
                                            <td>
                                                <form style={{ width: '100%' }}>
                                                    <input placeholder={dataName}></input>
                                                </form>
                                            </td>
                                        </tr>
                                        : null
                                )
                            }) : null
                    }
                </tbody>
            </table>
        </div>
    )

    const onOpenHandler = () => {
        Server.fetchTableDesc(tableName).then(response => {
            setTableDesc(response.data);
        })
    }

    const onCloseHandler = () => {
        dispatch(actions.setEditModal(false));
    }

    return (
        <Modal
            isOpen={editModal}
            onAfterOpen={onOpenHandler}
            onRequestClose={onCloseHandler}>
            {modalContent}
        </Modal>
    )
}

export default EditMenu;