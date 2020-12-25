import { Container, Grid, makeStyles, Paper, Typography, List, ListItem, Menu, ListItemText, MenuItem, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import Deposits from '../Deposits';
import Orders from '../Orders';
import clsx from 'clsx';
import Chart from '../Chart';
import EditableTable from '../../../components/EditableTable/EditableTable'

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 340,
  }, 
  date:{
    padding: '19px',
  }
}));

const options = [
  'Lifetime',
  'This Month',
  'This Year',
  'Pick Time Span',
];

const StatisticPage = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  let datePicker = null;
  if (selectedIndex === 3) {
    datePicker =
      <Grid item container>
        <Grid item xs={6}> 
            <form noValidate className={classes.date}>
              <TextField
                id="date"
                label="From"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form> 
        </Grid>
        <Grid item xs={6}> 
            <form noValidate className={classes.date}>
              <TextField
                id="date"
                label="Until"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form> 
        </Grid>
      </Grid>
  }
  else {
    console.log(selectedIndex)
  }

  //#region Menu methods
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //#endregion

  let menu =
    <div className={classes.menu}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Waktu Penjualan"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Waktu Penjualan" secondary={options[selectedIndex]} />
        </ListItem>
      </List>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>



  return <Container maxWidth="lg" className={classes.container}>
    <div className={classes.appBarSpacer} />

    <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
      Ringkasan Penjualan
      </Typography>

    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper>
          {menu}
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <Paper>
          {datePicker}
        </Paper>
      </Grid>

      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>

      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposits />
        </Paper>
      </Grid>

      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Januari
          </Typography>
          <EditableTable
            tableName='view_januari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Februari
          </Typography>
          <EditableTable
            tableName='view_februari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Maret
          </Typography>
          <EditableTable
            tableName='view_maret'
          />
        </Paper>
      </Grid>
    </Grid>
  </Container>
}

export default StatisticPage;