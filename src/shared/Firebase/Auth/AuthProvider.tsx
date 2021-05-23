import React, { Component } from 'react';
import firebase from 'firebase'
import {AuthContext} from './AuthContext';
import { loginUser, logoutUser } from './authAPI';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: firebase.User | null;
}


export class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
  state: AuthProviderState = {
    user: null
  }

  // authListener = firebase.auth().onAuthStateChanged(user => {
  //   this.setState({user: user})
  //   console.log(this.state)
  // })

  // componentDidMount() {
  //   console.log('auth provider')
  //   this.authListener()
  // }

  // componentWillUnmount() {
  //   this.authListener()
  // }

  onLogin = (email: string, password: string) => {
    console.log('logging in')
    return loginUser(email, password)
      .then(user => {
        this.setState({user: user})
      })
  }

  onLogout = () => {
    console.log('logging out')
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

