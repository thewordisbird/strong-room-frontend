import React from 'react';
import { FirestoreContext, firestoreContextProps } from './FirestoreContext';

export type withFirestoreProps = firestoreContextProps;

export function withFirestore<T extends withFirestoreProps = withFirestoreProps>(WrappedComponent: React.ComponentType<T>) {
  const WithFirebase = (props: Omit<T, keyof withFirestoreProps>) => {
    return (
      <FirestoreContext.Consumer>
        {firestoreProps => <WrappedComponent {...props as T} {...firestoreProps}/>}
      </FirestoreContext.Consumer>
    )
  }
  return WithFirebase
}