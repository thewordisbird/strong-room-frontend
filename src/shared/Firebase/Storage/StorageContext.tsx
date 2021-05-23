import React from 'react';

export type storageContextProps = {
  getPdfUrl: (invoiceId: string) => Promise<void | string>
}

export const StorageContext = React.createContext<Partial<storageContextProps>>({})