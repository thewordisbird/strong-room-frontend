import React from 'react';
import Firebase from './firebase';


export const FirebaseContext = React.createContext<Firebase | null>(null);

// type AuthContextProps = {
//   user: Firebase["user"];
//   isAuthenticated: boolean;
// }

// export const AuthContext = React.createContext<Partial<AuthContextProps>>({})

export default FirebaseContext;