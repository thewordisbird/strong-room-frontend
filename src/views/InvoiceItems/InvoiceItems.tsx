import React, { Component } from 'react';

import InvoiceSearch from './InvoiceSearch/InvoiceSearch'


import { withFirebase, WithFirebaseProps } from '../../shared/Firebase/withFirebase'
import { InvoiceData } from '../../shared/Firebase/firebase';
import SearchResults from './SearchResults/SearchResults';

type InvoiceItemsProps = WithFirebaseProps & {

};

type InvoiceItemsState = {
  isLoading: {
    isLoadingSearch: boolean;
    isLoadingResults: boolean;
  },
  queryData: {
    vendors: string[],
    invoices: InvoiceData[],
    filteredInvoices: InvoiceData[]
  },
  searchParams: {
    vendor: string | null,
    startDate: Date | null,
    endDate: Date | null
  }
};

const uniqueVendors = (invoiceData: InvoiceData[]): Set<string> => {
  return invoiceData.reduce((acc, cur) => (
    acc.add(cur.Vendor)
  ), new Set<string>())
}

const filterInvoiceData = (invoiceData: InvoiceData[], params: {vendor: string | null, startDate: Date | null, endDate: Date | null}): InvoiceData[] => {
  let filteredResults = invoiceData
  if (params.vendor) {
    filteredResults = filteredResults.filter(invoice => invoice.Vendor === params.vendor)
  }

  // For data filters. The firestore data currently holds the dates as strings. This has to be converted and compared until
  // The firestore db is updated with better typed data.
  if (params.startDate !== null) {
    const startDate = params.startDate
    filteredResults = filteredResults.filter(invoice => {
      const invoiceDate = new Date(invoice.invoiceDate)
      return invoiceDate >= startDate
    })
  }

  if (params.endDate) {
    const endDate = params.endDate
    filteredResults = filteredResults.filter(invoice => {
      const invoiceDate = new Date(invoice.invoiceDate)
      return invoiceDate <= endDate
    })
  }
  return filteredResults
}

class InvoiceItems extends Component<InvoiceItemsProps, InvoiceItemsState>{
  state: InvoiceItemsState = {
    isLoading: {
      isLoadingSearch: false,
      isLoadingResults: true
    },
    queryData: {
      vendors: [],
      invoices: [],
      filteredInvoices: []
    },
    searchParams: {
      vendor: null,
      startDate: null,
      endDate: null
    }
  }

  componentDidMount = async () => {
    // Query vendors to populate vendor select
    this.setState(prevState => (
      {
        ...prevState,
        isLoading: {
          isLoadingResults: true,
          isLoadingSearch: true
        }
      }
    ))

    const invoices = await this.props.firebase.loadInvoices();
    if (invoices) {
      const vendors = uniqueVendors(invoices)
      this.setState(prevState => (
        {
          ...prevState,
          isLoading: {
            isLoadingResults: false,
            isLoadingSearch: false
          },
          queryData: {
            vendors: Array.from(vendors),
            invoices: invoices,
            filteredInvoices: invoices
          }
        }
      ))
    }
  }

  componentDidUpdate(prevProps: InvoiceItemsProps, prevState: InvoiceItemsState) {
    // TODO: Query DB once and manage data locally. Currently re-quering on any queryParam change.
    //    - Firebase doesn't return results count in O(1) without full query.
    //      since this is a small data set. Manage everything after the first query locally
    //    - Storing item count in firestore will allow for managing pagination for non filtered queries, but 
    //      will still have the same problem for any filtering.
    if (prevState.searchParams !== this.state.searchParams) {
      const results = filterInvoiceData(this.state.queryData.invoices, this.state.searchParams)
      console.log(results)
      this.setState(prevState => (
        {
          ...prevState,
          queryData: {
            ...prevState.queryData,
            filteredInvoices: results
          }
        }
      ))
    } 
  }

  onSearchParamChange = (paramKey: string, paramValue: string | Date | null) => {
    this.setState(prevState => (
      {
        ...prevState,
        searchParams: {
          ...prevState.searchParams,
          [paramKey]: paramValue
        }
      }
    ))
  }

  render() {
    return (
      <div className="">
        <InvoiceSearch loading={this.state.isLoading.isLoadingSearch} vendors={this.state.queryData.vendors} searchParams={this.state.searchParams} onChange={this.onSearchParamChange}/>
       <SearchResults loading={this.state.isLoading.isLoadingResults} invoices={this.state.queryData.filteredInvoices} />
      </div>
    );
  };
};

export default withFirebase(InvoiceItems);