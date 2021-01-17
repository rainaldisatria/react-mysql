import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import ServerAPI from '../../Axios/ServerAPI';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();

  const [dataPemasukan, setDataPemasukan] = useState([]);

  useEffect(() => { 
    for (let i = 0; i < 12; i++) {
      ServerAPI.getMonthlyIncome(i + 1).then(res => { 
        let test = res.data[0]?.income;
        if(test === null){
          test = 0;
        }
        setDataPemasukan(prevValue => ({
          ...prevValue,
          [i]: test,
        }))
      })
    }
  }, []) 
 
  const data = [
    createData('Jan', dataPemasukan[0]),
    createData('Feb', dataPemasukan[1]),
    createData('March', dataPemasukan[2]),
    createData('April', dataPemasukan[3]),
    createData('May', dataPemasukan[4]),
    createData('June', dataPemasukan[5]),
    createData('July', dataPemasukan[6]),
    createData('August', dataPemasukan[7]),
    createData('Sep', dataPemasukan[8]),
    createData('Oct', dataPemasukan[9]),
    createData('Nov', dataPemasukan[10]),
    createData('Des', dataPemasukan[11]),
  ];


  return (
    <React.Fragment>
      <Title>This Year</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Obat Terjual
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}