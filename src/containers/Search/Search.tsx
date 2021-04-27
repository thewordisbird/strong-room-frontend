import React, { Component } from 'react';
// import DatePickerInput from '../../components/DatePickerInput/DatePickerInput';
// import VendorSelector from '../../components/VendorSelector/VendorSelector';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Firebase from '../../hoc/Firebase';
import { withFirebase } from '../../hoc/Firebase/context';

type SearchProps = {
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
  
  // queryParams: {vendor?: string, startDate?: Date, endDate?: Date} | null
}

const testSet = new Set();
testSet.add('justin')


class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    vendors : [],
    queryParams: {
      vendor: null,
    startDate: null,
    endDate: null
    }
    
    // queryParams: null
  }

  
  componentDidMount() {
    // Query vendors to populate vendor select
    console.log('cdm')
    this.props.firebase.getVendors()
      .then(vendors => {
        if (vendors) {
          const vendorArray = Array.from(vendors)
          this.setState({vendors: vendorArray})
        }
      })

  }

  componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
    
    console.log('cdu', prevState.queryParams !== this.state.queryParams)
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
    return (
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
      
        
    )
  }
}

export default withFirebase(Search);