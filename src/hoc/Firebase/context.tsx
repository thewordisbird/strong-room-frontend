import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext<Firebase | null>(null);

interface WithFirebaseProps {
  firebase: Firebase;
}


// export const withFirebase = <P extends WithFirebaseProps = WithFirebaseProps>(WrappedComponent: React.ComponentType<P>) =>
//   class WithFirebase extends React.Component<P & WithFirebaseProps> {
//     render() {
//       console.log('wrapping coponent with firebase')
//       return (
//         <FirebaseContext.Consumer>
//           {firebase => <WrappedComponent {...this.props as P} firebase={firebase} />}
//         </FirebaseContext.Consumer>
//       )
//     }
//   }

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

export default FirebaseContext;