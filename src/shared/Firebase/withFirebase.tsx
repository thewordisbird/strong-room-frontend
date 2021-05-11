import React from 'react';
import Firebase from './firebase';
import FirebaseContext from './context'

export interface WithFirebaseProps {
  firebase: Firebase;
}


export function withFirebase<T extends WithFirebaseProps = WithFirebaseProps>(WrappedComponent: React.ComponentType<T>) {
  const WithFirebase = (props: Omit<T, keyof WithFirebaseProps>) => {
    return (
      <FirebaseContext.Consumer>
        {firebase => <WrappedComponent {...props as T} firebase={firebase} />}
      </FirebaseContext.Consumer>
    )
  }
  return WithFirebase
}

// export default withFirebase