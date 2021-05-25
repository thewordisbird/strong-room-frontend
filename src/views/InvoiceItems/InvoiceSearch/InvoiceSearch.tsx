import React from 'react';

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

import { Card, CardContent, Grid, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete'
import DateFnsUtils from '@date-io/date-fns';

const styles = createStyles({
  root: {
    marginTop: '32px',
    marginBottom: '24px'
  },
  card: {
    margin: "12px 0"
  },
})

type SearchProps = WithStyles<typeof styles> & {
  loading: boolean;
  vendors: string[];
  searchParams: {vendor: string | null, startDate: Date | null, endDate: Date | null}
  onChange: (paramKey: string, paramValue: string | Date | null) => void;
}

const  InvoiceSearch: React.FC<SearchProps> = (props) => {
  const { vendors, searchParams, onChange, classes } = props

  // Handlers
  const handleVendorChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    onChange('vendor', newValue)
  }

  const handleStartDateChange = (date: Date | null) => {
    onChange('startDate', date)
  }

  const handleEndDateChange = (date: Date | null) => {
    onChange('endDate', date)
  }
  
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              id="vendor-combo-box"
              options={vendors}
              // style={{ width: "75%" }}
              fullWidth
              onChange={handleVendorChange}
              renderInput={(params) => <TextField {...params} label="Select Vendor" variant="outlined" />}
            />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog-start"
                  label="Start Date"
                  format="MM/dd/yyyy"
                  fullWidth
                  value={searchParams.startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                  'aria-label': 'change date',
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog-end"
                  label="End Date"
                  format="MM/dd/yyyy"
                  fullWidth
                  value={searchParams.endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          </CardContent>
        </Card>
      </div>
    )
}

export default withStyles(styles)(InvoiceSearch);