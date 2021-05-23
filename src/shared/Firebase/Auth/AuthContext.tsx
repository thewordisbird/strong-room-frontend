import React from 'react';
import firebase from 'firebase'

export type authContextProps = {
  user: firebase.User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  isAuthenticated: boolean
};

export const AuthContext = React.createContext<Partial<authContextProps>>({});
