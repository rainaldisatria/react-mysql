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

export const produk = (
  <div>
    <ListSubheader inset>Produk</ListSubheader>
    <Link to='/admin/listObat'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="List Obat" />
      </ListItem>
    </Link>
    <Link to='/admin/persediaan'>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Persediaan" />
      </ListItem>
    </Link>
    <Link>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Log Perubahan" />
      </ListItem>
    </Link>
    <Link>
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
    <Link>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Ringkasan Penjualan" />
      </ListItem>
    </Link>

    <Link>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Pesanan" />
      </ListItem>
    </Link>

    <Link>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Transaksi" />
      </ListItem>
    </Link>
  </div>
);

export const superAdmin = (
  <div>
    <ListSubheader inset>Super Admin</ListSubheader>
    <Link>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Control Panel" />
      </ListItem>
    </Link>
  </div>
);