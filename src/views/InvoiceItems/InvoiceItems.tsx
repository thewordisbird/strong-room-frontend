import React, { useEffect, useState } from 'react';
import InvoiceSearch from './InvoiceSearch/InvoiceSearch';
import SearchResults from './SearchResults/SearchResults';
import {
  InvoiceData,
} from '../../shared/Firebase/Firestore/interfaces/InvoiceData';
import {
  useFirestore,
} from '../../shared/Firebase/Firestore/FirestoreProvider';
import { filterInvoiceData } from './utils';

function InvoiceItems(): JSX.Element {
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceData[]>([]);
  const [searchParams, setSearchParams] = useState(
    { vendor: null, startDate: null, endDate: null },
  );

  const { loading, invoices, vendors } = useFirestore();

  useEffect(() => {
    const results = filterInvoiceData(invoices, searchParams);
    setFilteredInvoices(results);
  }, [invoices, searchParams]);

  function handleSearchParamChange(
    paramKey: string,
    paramValue: string | Date | null,
  ): void {
    setSearchParams((prevState) => (
      {
        ...prevState,
        [paramKey]: paramValue,
      }
    ));
  }

  return (
    <div className="">
      <InvoiceSearch
        loading={false}
        vendors={vendors}
        searchParams={searchParams}
        onChange={handleSearchParamChange}
      />
      <SearchResults loading={loading} invoices={filteredInvoices} />
    </div>
  );
}

export default InvoiceItems;
