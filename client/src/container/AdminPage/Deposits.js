import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {moneyFormat} from '../../Utility'; 

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({totalIncome, penjelasan}) {
  const classes = useStyles(); 
  return (
    <React.Fragment>
      <Title>Total Income</Title>
      <Typography component="p" variant="h4">
        Rp. {totalIncome ? moneyFormat(totalIncome): '0,00'}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {penjelasan}
      </Typography> 
    </React.Fragment>
  );
}