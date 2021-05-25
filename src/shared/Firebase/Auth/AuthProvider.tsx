import React, { Component } from 'react';
import firebase from 'firebase'
import {AuthContext} from './AuthContext';
import { authCheckState, loginUser, logoutUser } from './authAPI';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: firebase.User | null;
  loadingAuth: boolean;
}


export class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
  state: AuthProviderState = {
    user: null,
    loadingAuth: true
  }

  authStateCheckSub: firebase.Unsubscribe | null = null;

  componentDidMount() {
    this.authStateCheckSub = authCheckState(this.setStateAfterAuthStateCheck)
  }

  componentWillUnmount() {
    if (this.authStateCheckSub) {
      this.authStateCheckSub()
    }
  }

  setStateAfterAuthStateCheck = (user: firebase.User | null) => {
    this.setState({user: user, loadingAuth: false})
  }

  onLogin = (email: string, password: string) => {
    return loginUser(email, password)
      .then(user => {
        this.setState({user: user})
      })
  }

  onLogout = () => {
    return logoutUser()
      .then(() => {
        this.setState({user: null})
      })
    }

  render () {
    return (
      <AuthContext.Provider 
        value={
          {
            user: this.state.user, 
            loginUser: this.onLogin,
            logoutUser: this.onLogout,
            isAuthenticated: this.state.user !== null,
          }
        }
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

