import React, { Component } from 'react';

import NavBar from './shared/Navbar/Navbar';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Container from '@material-ui/core/Container';
import InvoiceItems from './views/InvoiceItems/InvoiceItems';
import InvoiceDetails from './views/InvoiceDetails/InvoiceDetails';
import Login from './views/Auth/Login';

type AppProps = {};

type AppState = {
  searchQuery: {vendor?: string | null, startDate?: Date | null, endDate?: Date | null}
  isAuthenticated: boolean;
}

class App extends Component<AppProps, AppState> {
  state = {
    searchQuery: {},
    isAuthenticated: true
  }

  onSearchParamChange = (params : {vendor?: string | null, startDate?: Date | null, endDate?: Date | null}) => {
    this.setState({
      searchQuery: {
        ...params
      }
    })
  }

  render() {
    return (
      <Router>
        <NavBar title="Burbank Square" isAuthenticated={this.state.isAuthenticated}/>
        <Container maxWidth="md">
          <Switch>
            <Route path="/auth">
              <Login />
            </Route>
            <Route path="/details">
              <InvoiceDetails />
            </Route>
            <Route path="/">
              <InvoiceItems />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
