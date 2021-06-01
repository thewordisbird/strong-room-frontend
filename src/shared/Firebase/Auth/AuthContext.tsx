import React from 'react';
import firebase from 'firebase'

export type authContextProps = {
  user?: firebase.User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

export const AuthContext = React.createContext<Partial<authContextProps>>({});
