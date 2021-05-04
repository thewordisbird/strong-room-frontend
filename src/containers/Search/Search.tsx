import React, { Component } from 'react';

import { withFirebase } from '../../hoc/Firebase/context';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

import { Card, CardContent, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Firebase from '../../hoc/Firebase';

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
  onChange: (params: {vendor?: string | null, startDate?: Date | null, endDate?: Date | null}) => void;
  firebase: Firebase;
}

type SearchState = {
  vendors: string[] ;
  queryParams: {
    vendor: string | null;
    startDate: Date | null;
    endDate: Date | null
  }
}

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    vendors : [],
    queryParams: {
      vendor: null,
    startDate: null,
    endDate: null
    }
  }

  componentDidMount() {
    // Query vendors to populate vendor select
    this.props.firebase.getVendors().then(vendors => {
        const vendorArray = Array.from(vendors)
        this.setState({vendors: vendorArray})
    })
  }

  componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
    // TODO: Query DB once and manage data locally. Currently re-quering on any queryParam change.
    //    - Firebase doesn't return results count in O(1) without full query.
    //      since this is a small data set. Manage everything after the first query locally
    //    - Storing item count in firestore will allow for managing pagination for non filtered queries, but 
    //      will still have the same problem for any filtering.
    if (prevState.queryParams !== this.state.queryParams) {
      this.props.onChange(this.state.queryParams)
    }
  }

  // Helpers
  updateQueryParams = (param: {}) => {
    this.setState(prevState => (
      {
        ...prevState,
        queryParams: {
          ...prevState.queryParams,
          ...param
        }
      }
    ))
  }

  // Handlers
  // Return query params to app to be passed to results component
  handleVendorChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    this.updateQueryParams({vendor: newValue})
  }

  handleStartDateChange = (date: Date | null) => {
    this.updateQueryParams({startDate: date})
  }

  handleEndDateChange = (date: Date | null) => {
    this.updateQueryParams({endDate: date})
  }
  
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              id="vendor-combo-box"
              options={this.state.vendors}
              // style={{ width: "75%" }}
              fullWidth
              onChange={this.handleVendorChange}
              renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
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
                  value={this.state.queryParams.startDate}
                  onChange={this.handleStartDateChange}
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
                  value={this.state.queryParams.endDate}
                  onChange={this.handleEndDateChange}
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
}

export default withFirebase(
                withStyles(styles)(
                  Search
                )
              );