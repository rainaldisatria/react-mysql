import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';

const DatePicker = ({ find, setFromDate, fromDate, setUntilDate, untilDate }) => {
    const onChangeHandler = (e, setField) => {
        const value = e.target.value;
        setField(value);
    }

    return (
        <Grid item container style={{ marginTop: '0px', padding: '20px' }}>
            <Grid item xs={4}>
                <TextField
                    id="date"
                    label="From"
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                    onChange={(e) => onChangeHandler(e, setFromDate)}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="date"
                    label="Until"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                    onChange={(e) => onChangeHandler(e, setUntilDate)}
                />
            </Grid>
            <Grid item xs={4} style={{ margin: 'auto' }} justify="flex-end" container>
                <Button
                    color='primary'
                    onClick={find}
                >
                    Find
           </Button>
            </Grid>
        </Grid>
    )
}

export default DatePicker;