import React, { useEffect, useState } from 'react';
import InvoiceSearch from './InvoiceSearch/InvoiceSearch';
import SearchResults from './SearchResults/SearchResults';
import { InvoiceData } from '../../shared/Firebase/Firestore/interfaces/InvoiceData';
import { useFirestore } from '../../shared/Firebase/Firestore/FirestoreProvider';
import { filterInvoiceData } from './utils';

type InvoiceItemsProps = {
  children?: React.ReactNode;
}

const InvoiceItems = (props: InvoiceItemsProps) => {
  const { loading, invoices, vendors } = useFirestore();
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceData[]>([]);
  const [searchParams, setSearchParams] = useState({ vendor: null, startDate: null, endDate: null });

  useEffect(() => {
    console.log('useEffect invoices', invoices);
    const results = filterInvoiceData(invoices, searchParams);
    console.log('useEffect results', results);
    setFilteredInvoices(results);
  }, [invoices, searchParams]);

  function handleSearchParamChange(paramKey: string, paramValue: string | Date | null) {
    setSearchParams((prevState) => (
      {
        ...prevState,
        [paramKey]: paramValue,
      }
    ));
  }

  return (
    <div className="">
      <InvoiceSearch loading={false} vendors={vendors} searchParams={searchParams} onChange={handleSearchParamChange} />
      <SearchResults loading={loading} invoices={filteredInvoices} />
    </div>
  );
};

export default InvoiceItems;
