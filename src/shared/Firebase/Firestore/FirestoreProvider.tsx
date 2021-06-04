import React, { useState, useEffect, useContext } from 'react';
import { InvoiceData } from './interfaces/InvoiceData';
import { getInvoices } from './firestoreAPI';

const FirestoreContext = React.createContext({});

type firestoreProviderProps = {
  children: React.ReactNode;
}

function FirestoreProvider(props: firestoreProviderProps): JSX.Element {
  /*  For the following reasons, all invoices are pulled down and stored
      locally on the first invocation of this hook.

      1. Firestore doesn't offer an 0(1) method to retrieve the document
          count of a query which is needed for the Material-UI pagination.
          Since the data has to be brought locally to count, we might as
          well store it.

      2. The invoice data is all historical data that isn't updated past it's
          original scrape. This means we will never be stuck with stale data,
          or miss data.
  */
  const [invoices, setInvoices] = useState<InvoiceData[] | null>(null);
  const [vendors, setVendors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { children } = props;

  function fetchInvoices(): Promise<InvoiceData[] | void> {
    return getInvoices()
      .then((_invoices) => {
        if (_invoices) {
          _invoices.sort((a, b) => {
            const dateA = new Date(a.invoiceDate);
            const dateB = new Date(b.invoiceDate);
            return dateA > dateB ? -1 : 1;
          });
        }
        return _invoices;
      })
      .catch((_error) => {
        throw (_error);
      });
  }

  function getUniqueVendors(invoiceData: InvoiceData[]): Set<string> {
    return invoiceData.reduce((acc, cur) => (
      acc.add(cur.Vendor)
    ), new Set<string>());
  }

  useEffect(() => {
    if (!invoices) {
      setLoading(true);
      fetchInvoices()
        .then((_invoices) => {
          if (_invoices) {
            const uniqueVendors = getUniqueVendors(_invoices);
            setInvoices(_invoices);
            setVendors(Array.from(uniqueVendors));
          }
        })
        .catch((_error) => {
          setError(_error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [invoices]);

  function getInvoice(id: string): InvoiceData | null {
    if (invoices) {
      return invoices.filter((invoice) => invoice.id === id)[0];
    }
    return null;
  }

  return (
    <FirestoreContext.Provider
      value={
        {
          invoices,
          vendors,
          getInvoice,
          loading,
          error,
        }
      }
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </FirestoreContext.Provider>
  );
}

type useFirestoreType = {
  invoices: InvoiceData[];
  vendors: string[];
  // eslint-disable-next-line no-unused-vars
  getInvoice: (id: string) => InvoiceData | null;
  loading: boolean;
  error: string | null;
}

const useFirestore = (): useFirestoreType => useContext(FirestoreContext) as useFirestoreType;

export { FirestoreProvider, useFirestore };
