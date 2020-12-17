import React from 'react';
import EditableTable from '../../components/EditableTable/EditableTable';
import EditMenu from '../../components/EditMenu/EditMenu';

const AdminDashboard = () => {
    return (
        <div> 
            <EditMenu></EditMenu>
            <h1>Admin Dashboard</h1>
            <EditableTable
                tableName={'log_perubahan'}
            ></EditableTable>
            <EditableTable
                Editable
                tableName={'obat_kadaluarsa'}
            ></EditableTable>
            <EditableTable
                Editable
                tableName={'tabel_obat'}
            ></EditableTable>
            <EditableTable
                Editable
                tableName={'tabel_persediaan'}
            ></EditableTable>
        </div>
    )
}

export default AdminDashboard;