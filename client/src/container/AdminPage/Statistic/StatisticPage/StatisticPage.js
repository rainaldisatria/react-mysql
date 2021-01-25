import { Container, Grid, makeStyles, Paper, Typography, List, ListItem, Menu, ListItemText, MenuItem, TextField, Button, Divider } from '@material-ui/core';
import React, { useEffect } from 'react';
import Deposits from '../../Deposits';
import clsx from 'clsx';
import Chart from '../../Chart';
import Table from '../../../../components/Table/Table'
import DatePicker from './DatePicker';
import OptionMenu from './OptionMenu';
import ServerAPI from '../../../../Axios/ServerAPI';
import { getCurrentDateToSQL } from '../../../../Utility';
import sendNotification from '../../../../components/Notification/Notification';

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
  spacer: {
    paddingTop: theme.spacing(4),
  },
}));

const options = [
  'Lifetime',
  'This Month',
  'This Year',
  'Time Span',
];

const StatisticPage = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tableData, setTableData] = React.useState();
  const [tableHeader, setTableHeader] = React.useState();

  //#region Date  
  const [fromDate, setFromDate] = React.useState();
  const [untilDate, setUntilDate] = React.useState();

  console.log(tableData);

  const find = () => {
    const formatedFromDate = fromDate;
    const formatedUntilDate = untilDate;

    const data = {
      fromDate: formatedFromDate,
      untilDate: formatedUntilDate,
    }

    if (formatedFromDate && formatedUntilDate && (formatedFromDate < formatedUntilDate)) {
      ServerAPI.getAnalyticTable(data)
        .then(response => {
          setTableData(response.data);
          setTableHeader(`${fromDate} - ${untilDate}`)
        })
    }
    else{
      sendNotification('Please enter correct time span', 'error', 2);
    }
  }

  let datePicker = null;
  if (selectedIndex === options.indexOf('Time Span')) {
    datePicker = <DatePicker
      find={find}
      fromDate={fromDate}
      untilDate={untilDate}
      setFromDate={setFromDate}
      setUntilDate={setUntilDate} />;
  }

  //#endregion

  //#region Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const getLifeTimeAnalyticTableData = () => {
    const data = {
      fromDate: '0000-01-01',
      untilDate: '9999-12-31',
    }
    ServerAPI.getAnalyticTable(data)
      .then(response => {
        setTableData(response.data);
        setTableHeader(options[selectedIndex])
      })

  }

  const getThisMonthAnalyticData = () => {
    var my_date = new Date();
    const month = my_date.toLocaleString('default', { month: 'long' });

    // To ISOString aga aneh. Dia ketinggalan 1 hari
    var first_date = new Date(my_date.getFullYear(), my_date.getMonth(), 2).toISOString().split('T')[0];
    var last_date = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 1).toISOString().split('T')[0];

    const data = {
      fromDate: first_date,
      untilDate: last_date,
    }

    ServerAPI.getAnalyticTable(data)
      .then(response => {
        setTableData(response.data);
        setTableHeader(month);
      })
  }

  const getThisYearAnalyticData = () => {
    const curDate = new Date();
    var fromDate = new Date(curDate.getFullYear(), 0, 2).toISOString().split('T')[0];
    var untilDate = new Date(curDate.getFullYear(), 12, 1).toISOString().split('T')[0];

    const data = {
      fromDate: fromDate,
      untilDate: untilDate,
    }

    ServerAPI.getAnalyticTable(data)
      .then(response => {
        setTableData(response.data);
        setTableHeader(curDate.getFullYear());
      })
  }

  useEffect(() => {
    getLifeTimeAnalyticTableData();
  }, [])

  useEffect(() => {
    switch (selectedIndex) {
      case options.indexOf('Lifetime'):
        getLifeTimeAnalyticTableData();
        break;
      case options.indexOf('This Month'):
        getThisMonthAnalyticData();
        break;
      case options.indexOf('This Year'):
        getThisYearAnalyticData();
        break;
      case options.indexOf('Time Span'):
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

    <Typography component="h1" variant="h2" align="left" color="textPrimary">
      Ringkasan Penjualan
    </Typography>
    <Divider />

    <div className={classes.spacer} />

    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper>
          <OptionMenu
            options={options}
            selectedIndex={selectedIndex}
            handleClickListItem={handleClickListItem}
            handleClose={handleClose}
            handleMenuItemClick={handleMenuItemClick}
            anchorEl={anchorEl} 
            title={'Waktu Penjualan'}
            />
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
          <Chart title={tableHeader} />
        </Paper>
      </Grid>


      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposits 
            totalIncome={tableData?.[1]?.[0]['TotalPendapatan']}
            penjelasan={tableHeader}
          />
        </Paper>
      </Grid>

      {
        tableData ?
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5" align="left" color="textPrimary" gutterBottom>
                Total Penjualan: {tableHeader}
              </Typography>
              <Table
                table={tableData?.[0]}
              />
            </Paper>
          </Grid> : null
      }

      <Grid item xs>
        <Typography component="h1" variant="h2" align="left" color="textPrimary">
          Tabel View: Total penjualan di 3 bulan pertama
      </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <div className={classes.spacer} />

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="left" color="textPrimary" gutterBottom>
            Januari
          </Typography>
          <Table
            tableName='view_januari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="left" color="textPrimary" gutterBottom>
            Februari
          </Typography>
          <Table
            tableName='view_februari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="left" color="textPrimary" gutterBottom>
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