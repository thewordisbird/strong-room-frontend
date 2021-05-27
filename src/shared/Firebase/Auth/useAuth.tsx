import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import firebase from 'firebase';
import { authCheckState, loginUser } from './authAPI';

export type useAuthProps = {
  user: firebase.User | null,
  loadingAuth: boolean,
  isAuthenticated: boolean
  loginUser: (email: string, password: string) => Promise<void>;
}

export const useAuth = (): useAuthProps => {
  // const authContext = useContext(AuthContext)
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true)

  useEffect(() => {
    authCheckState()
      .then(user => {
        if (user) {
          setUser(user)
          setLoadingAuth(false)
        }
        
      })
      .catch(() => {
        setUser(null)
        setLoadingAuth(false)
      })
  }, [])

  // const setLocalAuth = () => {
  // }

  // const clearLocalAuth = () => {

  // }


  // const login = (email:string, password: string):Promise<void | string> => {

  // }

  // const logout = (): Promise<void> => {

  // }


  return {
    user: user,
    loadingAuth: loadingAuth,
    isAuthenticated: !!user,
    loginUser: loginUser
  }
}