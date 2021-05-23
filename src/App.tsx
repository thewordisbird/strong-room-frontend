import React, { Component } from 'react';

import { withAuth, withAuthProps } from './shared/Firebase/Auth/withAuth';

import NavBar from './shared/Navbar/Navbar';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"; 
import Container from '@material-ui/core/Container';
import InvoiceItems from './views/InvoiceItems/InvoiceItems';
import InvoiceDetails from './views/InvoiceDetails/InvoiceDetails';
import Login from './views/Auth/Login';
// import {withFirebase, WithFirebaseProps } from './shared/Firebase/withFirebase';
// import { withFirestore, withFirestoreProps } from './shared/Firebase/Firestore/withFirestore';

type AppProps = withAuthProps;

type AppState = {
  searchQuery: {vendor?: string | null, startDate?: Date | null, endDate?: Date | null}
}

class App extends Component<AppProps, AppState> {
  state = {
    searchQuery: {}
  }
  
  componentDidMount() {
    console.log('mounting app')
  }

  render() {
    const { isAuthenticated } = this.props
    const routes = isAuthenticated
      ? (
        <Switch>
            <Route path="/details"><InvoiceDetails /></Route>
            <Route path="/"><InvoiceItems /></Route>
          </Switch>
        )
      : (
        <Switch>
            <Route path="/auth"><Login /></Route>
            <Redirect to="/auth" />
          </Switch>
      )
    return (
      <Router>
        <NavBar title="Burbank Square"/>
        <Container maxWidth="md">
          { routes }
        </Container>
      </Router>
    );
  }
}

export default withAuth(App);
