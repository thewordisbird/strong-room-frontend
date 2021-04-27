import React, { Component } from 'react';
import DatePickerInput from '../../components/DatePickerInput/DatePickerInput';
import VendorSelector from '../../components/VendorSelector/VendorSelector';
import Firebase from '../../hoc/Firebase';
import { withFirebase } from '../../hoc/Firebase/context';

type SearchProps = {
  test?: string;
  firebase: Firebase;
}

type SearchState = {
  vendors: string[] | null;
  resultQueryString: string | null
}


class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    vendors : null,
    resultQueryString: null
  }

  
  componentDidMount() {
    // Query vendors to populate vendor select
    this.props.firebase.getVendors()
  }
  

  render() {
    return (
      <>
        <VendorSelector />
        <DatePickerInput />
        <DatePickerInput />
      </>
    )
  }
}

export default withFirebase(Search);