import React, { useContext, useState, useEffect } from 'react';
import firebase from 'firebase';
import { authCheckState, loginUser, logoutUser } from './authAPI';
import PageLoading from '../../PageLoading/PageLoading';

const AuthContext = React.createContext({});

type authProviderProps = {
  children: React.ReactNode;
};

function AuthProvider(props: authProviderProps): JSX.Element {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

  const { children } = props;

  useEffect(() => {
    // Trigger observer to monitor firebase auth state.
    // Note: I think this should run every render, this will ensure that
    // for any time AuthProvider is rendered the auth state will be called.
    // Asses as progress is made, might only want to run once on initial render.
    authCheckState()
      .then((authUser) => {
        if (authUser) {
          setUser(authUser);
          setLoadingAuth(false);
        }
      })
      .catch(() => {
        setUser(null);
        setLoadingAuth(false);
      });
  });

  function login(email: string, password: string): Promise<void> {
    return loginUser(email, password)
      .then((authUser) => {
        setUser(authUser as firebase.User);
      })
      .catch((error) => {
        throw (error);
      });
  }

  // function login(email: string, password: string): Promise<void> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const user = await loginUser(email, password);
  //       setUser(user as firebase.User);
  //       resolve();
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  function logout(): Promise<void> {
    return logoutUser()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        throw (error);
      });
  }

  // Return global loading page while checking auth status.
  if (loadingAuth) {
    return <PageLoading />;
  }

  return (
    <AuthContext.Provider
      value={
        {
          isAuthenticated: !!user,
          login,
          logout,
        }
      }
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </AuthContext.Provider>
  );
}

type useAuthType = {
  isAuthenticated: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuth = (): useAuthType => useContext(AuthContext) as useAuthType;

export { AuthProvider, useAuth };
