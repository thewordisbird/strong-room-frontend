import React, {useContext, useState, useEffect } from 'react';
import firebase from 'firebase'
import { authCheckState, loginUser, logoutUser } from './authAPI';
import PageLoading from '../../PageLoading/PageLoading';

const AuthContext = React.createContext({});

type authProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider (props: authProviderProps) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true)

  useEffect(() => { 
    // Trigger observer to monitor firebase auth state. 
    // Note: I think this should run every render, this will ensure that 
    // for any time AuthProvider is rendered the auth state will be called.
    // Asses as progress is made, might only want to run once on initial render.
    authCheckState()
      .then(user => {
        if (user) {
          console.log('setting user')
          setUser(user)
          setLoadingAuth(false)
        }
        
      })
      .catch(() => {
        setUser(null)
        setLoadingAuth(false)
      })
  })

  function login (email: string, password: string): Promise<void> {
    return new Promise (async (resolve, reject) => {
      try {
        const user = await loginUser(email, password)
        setUser(user as firebase.User) 
        resolve();
      } catch (error) {
        reject(error)
      } 
    })
  }

  function logout (): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await logoutUser()
        setUser(null)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Return global loading page while checking auth status.
  if (loadingAuth) {
    return <PageLoading />
  }

  return (
    <AuthContext.Provider 
      value={
        {
          isAuthenticated: !!user,
          login: login,
          logout: logout
        }
      } 
      {...props} 
    >
      {props.children}
    </AuthContext.Provider>
  )
}

type useAuthProps = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = () => useContext(AuthContext) as useAuthProps
