import React from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';

const EditMenu = () => {
    const dispatch = useDispatch();
    const editModal = useSelector(state => state.editModal);

    return (
        <Modal>
            isOpen={editModal}
            
        </Modal>
    )
}

export default EditMenu;