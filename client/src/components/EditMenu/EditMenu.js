import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import Server from '../../Axios/Server';

Modal.setAppElement('#root');

const EditMenu = (props) => {
    const dispatch = useDispatch();

    const tableName = useSelector(state => state.table)
    const editModal = useSelector(state => state.editModal);

    const [tableDesc, setTableDesc] = useState({});

    let modalContent = (
        <div>
            <h1>Edit Value</h1>
            <table style={{width: "100%"}}>
                <thead>
                    {
                        Object.keys(tableDesc).map((columnName, colId) => {
                            return (
                                <th>
                                    {columnName}
                                </th>
                            )
                        })
                    }
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )

    const onOpenHandler = () => {
        Server.fetchTableDesc(tableName).then(response => {
            //[{"Field":"Kode_Obat","Type":"varchar(10)","Null":"NO","Key":"PRI","Default":null,"Extra":""},
            setTableDesc(response.data[0]);
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