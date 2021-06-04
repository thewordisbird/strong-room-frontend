import React from 'react';
import {
  Card, CardContent, Grid, makeStyles, TextField,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
  root: {
    marginTop: '32px',
    marginBottom: '24px',
  },
  card: {
    margin: '12px 0',
  },
});

type SearchProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  loading: boolean;
  vendors: string[];
  searchParams: {
    vendor: string | null,
    startDate: Date | null,
    endDate: Date | null
  }
  // eslint-disable-next-line no-unused-vars
  onChange: (paramKey: string, paramValue: string | Date | null) => void;
}

function InvoiceSearch(props: SearchProps): JSX.Element {
  const { vendors, searchParams, onChange } = props;

  const classes = useStyles();

  function handleVendorChange(
    // eslint-disable-next-line @typescript-eslint/ban-types
    event: React.ChangeEvent<{}>,
    newValue: string | null,
  ): void {
    onChange('vendor', newValue);
  }

  function handleStartDateChange(date: Date | null): void {
    onChange('startDate', date);
  }

  function handleEndDateChange(date: Date | null): void {
    onChange('endDate', date);
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
                renderInput={() => (
                  <TextField
                    label="Select Vendor"
                    variant="outlined"
                  />
                )}
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
  );
}

export default InvoiceSearch;
