import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ReceiptIcon from '@material-ui/icons/Receipt'; 
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BuildIcon from '@material-ui/icons/Build';

export const produk = (
  <div>
    <ListSubheader inset>Produk</ListSubheader>
    <Link to='/admin/listObat'>
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        <ListItemText primary="List Obat" />
      </ListItem>
    </Link>
    <Link to='/admin/persediaanObat'>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Persediaan" />
      </ListItem>
    </Link>
    <Link to='/admin/logPerubahan'>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Log Perubahan" />
      </ListItem>
    </Link>
    <Link to='/admin/obatKadaluarsa'>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Obat Kadaluarsa" />
      </ListItem>
    </Link>
  </div >
);

export const statistik = (
  <div>
    <ListSubheader inset>Statistik</ListSubheader>
    <Link to='/admin/statistik'>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Ringkasan Penjualan" />
      </ListItem>
    </Link>

    <Link to='/admin/orders'>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Pesanan" />
      </ListItem>
    </Link>

    <Link to='/admin/transactions'>
      <ListItem button>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Transaksi" />
      </ListItem>
    </Link>
  </div>
);

export const superAdmin = (
  <div>
    <ListSubheader inset>Super Admin</ListSubheader>
    <Link to='/admin/controlpanel'>
      <ListItem button>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Control Panel" />
      </ListItem>
    </Link>
  </div>
);