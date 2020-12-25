import React from 'react';
import EditableTable from '../../components/EditableTable/EditableTable';
import EditMenu from '../../components/EditMenu/EditMenu';

const AdminDashboard = () => {
    return (
        <div> 
            <h1>Admin Dashboard</h1>
            <EditableTable
                tableName={'log_perubahan'}
            ></EditableTable>
            <EditableTable
                editable
                tableName={'obat_kadaluarsa'}
            ></EditableTable>
            <EditableTable
                editable
                tableName={'tabel_obat'}
            ></EditableTable>
            <EditableTable
                editable
                tableName={'tabel_persediaan'}
            ></EditableTable>
        </div>
    )
}

export default AdminDashboard;