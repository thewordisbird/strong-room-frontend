import React, { useState, useEffect, useContext } from 'react';
import {InvoiceData} from './interfaces/InvoiceData';
import { getInvoices} from './firestoreAPI'

const FirestoreContext = React.createContext({});

type firestoreProviderProps = {
  children: React.ReactNode;
}

export function FirestoreProvider (props: firestoreProviderProps) {
  /*  For the following reasons, all invoices are pulled down and stored locally on the first
      invocation of this hook. 

      1. Firestore doesn't offer an 0(1) method to retrieve the document count of a query which
          is needed for the Material-UI pagination. Since the data has to be brought locally to 
          count, we might as well store it.
      2. The invoice data is all historical data that isn't updated past it's original scrape.
          this means we will never be stuck with stale data, or miss data.
  */

  const [invoices, setInvoices] = useState<InvoiceData[] | null>(null)
  const [ vendors, setVendors ] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    if (!invoices) {
      setLoading(true)
      fetchInvoices()
        .then(invoices => {
          if (invoices) {
            const vendors = uniqueVendors(invoices);
            setInvoices(invoices);
            setVendors(Array.from(vendors))
          }
        })
        .catch(error => {
          setError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [invoices])
  
  function fetchInvoices(): Promise<InvoiceData[] | void> {
    return new Promise(async(resolve, reject) => {
      try {
        const invoices = await getInvoices()
        if (invoices) {
          invoices.sort((a,b) => {
            const dateA = new Date(a.invoiceDate);
            const dateB = new Date(b.invoiceDate);
            return dateA > dateB ? -1 : 1
          })
        }
        resolve(invoices)
        }
      catch(error) {
          reject(error) 
      }
    })
    
  }

  function uniqueVendors(invoiceData: InvoiceData[]): Set<string>{
    return invoiceData.reduce((acc, cur) => (
      acc.add(cur.Vendor)
    ), new Set<string>())
  }

  function getInvoice(id: string): InvoiceData | null {
    if (invoices) {
      return invoices.filter(invoice => {
        return invoice.id === id
      })[0]
    }
    return null
  }

  return (
    <FirestoreContext.Provider
      value={
        {
          invoices: invoices,
          vendors: vendors,
          getInvoice: getInvoice,
          loading: loading,
          error: error
        }
      }
      { ...props}
    >
      {props.children}
    </FirestoreContext.Provider>
  )
}

type useFirestoreProps = {
  invoices: InvoiceData[];
  vendors: string[];
  getInvoice: (id: string) => InvoiceData | null;
  loading: boolean;
  error: string | null;
}

export const useFirestore = () => useContext(FirestoreContext) as useFirestoreProps;