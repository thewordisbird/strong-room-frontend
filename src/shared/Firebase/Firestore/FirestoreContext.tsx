import React from 'react';
import { InvoiceData } from './interfaces/InvoiceData'

export type firestoreContextProps = {
  getInvoices: () => Promise<void | InvoiceData[]>;
  getInvoice: (id: string) => Promise<InvoiceData>;
}

export const FirestoreContext = React.createContext<Partial<firestoreContextProps>>({})


