import React from 'react';
import { FirestoreContext } from './FirestoreContext';
import { getInvoices, getInvoice } from './firestoreAPI'

type firestoreProviderProps = {
  children: React.ReactNode;
}

const FirestoreProvider: React.FC<firestoreProviderProps> = (props: firestoreProviderProps) => (
      <FirestoreContext.Provider
        value = {
          {
            getInvoices: getInvoices,
            getInvoice: getInvoice
          }
        }
      >
        {props.children}
      </FirestoreContext.Provider>
);

export default FirestoreProvider;