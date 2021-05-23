import React from 'react';
import { getPdfUrl } from './storageAPI';
import { StorageContext } from './StorageContext';

type storageProviderProps = {
  children: React.ReactNode;
}
export const StorageProvider: React.FC<storageProviderProps> = (props: storageProviderProps) => (
  <StorageContext.Provider
    value={
      {
        getPdfUrl: getPdfUrl
      }
    }
    >
      {props.children}
    </StorageContext.Provider>
);