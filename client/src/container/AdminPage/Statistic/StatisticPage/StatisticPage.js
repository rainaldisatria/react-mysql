import { Container, Grid, makeStyles, Paper, Typography, List, ListItem, Menu, ListItemText, MenuItem, TextField, Button, Divider } from '@material-ui/core';
import React, { useEffect } from 'react';
import Deposits from '../../Deposits';
import clsx from 'clsx';
import Chart from '../../Chart';
import Table from '../../../../components/Table/Table'
import DatePicker from './DatePicker';
import OptionMenu from './OptionMenu';
import ServerAPI from '../../../../Axios/ServerAPI';

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

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tableData, setTableData] = React.useState();


  const getLifeTimeAnalyticTableData = () => {
    const data = {
      fromDate: '1000-01-01',
      untilDate: '9999-12-31',
    }
    ServerAPI.getAnalyticTable(data)
      .then(response => {
        console.log(response.data);
        setTableData(response.data);
      })
  }

  useEffect(() => {
    getLifeTimeAnalyticTableData();
  }, [])

  //#region Date 
  const find = () => {

  }

  let datePicker = null;
  if (selectedIndex === options.indexOf('Pick Time Span')) {
    datePicker = <DatePicker find={find} />;
  }
  //#endregion

  //#region Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    switch (selectedIndex) {
      case options.indexOf('Lifetime'):
        getLifeTimeAnalyticTableData();
        break;
      case options.indexOf('This Month'):
        console.log('This Month')
        break;
      case options.indexOf('This Year'):
        console.log('This Year')
        break;
      case options.indexOf('Pick Time Span'):
        console.log('Pick Time Span')
        break;
    }
  }, [selectedIndex])

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //#endregion


  return <Container maxWidth="lg" className={classes.container}>
    <div className={classes.appBarSpacer} />

    <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
      Ringkasan Penjualan
    </Typography>

    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper>
          <OptionMenu
            options={options}
            selectedIndex={selectedIndex}
            handleClickListItem={handleClickListItem}
            handleClose={handleClose}
            handleMenuItemClick={handleMenuItemClick}
            anchorEl={anchorEl} />
        </Paper>
      </Grid>

      <Grid item xs={9} md={5} lg={6}>
        <Paper >
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

      {
        tableData ?
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
                Total Penjualan: {options[selectedIndex]}
            </Typography>
              <Table
                table={tableData}
              />
            </Paper>
          </Grid> : null
      }

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs>
        <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
          Penjualan 3 bulan pertama
      </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Januari
          </Typography>
          <Table
            tableName='view_januari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Februari
          </Typography>
          <Table
            tableName='view_februari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Maret
          </Typography>
          <Table
            tableName='view_maret'
          />
        </Paper>
      </Grid>
    </Grid>
  </Container>
}

export default StatisticPage;