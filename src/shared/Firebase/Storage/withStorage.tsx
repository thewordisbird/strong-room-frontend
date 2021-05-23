import React from 'react';
import { StorageContext, storageContextProps } from './StorageContext';

export type withStorageProps = storageContextProps;

export function withStorage<T extends withStorageProps = withStorageProps>(WrappedComponent: React.ComponentType<T>) {
  const WithFirebase = (props: Omit<T, keyof withStorageProps>) => {
    return (
      <StorageContext.Consumer>
        {storageProps => <WrappedComponent {...props as T} {...storageProps}/>}
      </StorageContext.Consumer>
    )
  }
  return WithFirebase
}