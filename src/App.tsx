import React, { Component } from 'react';

import NavBar from './components/Navbar/Navbar';
// import Search from './views/InvoiceItems/InvoiceSearch/InvoiceSearch';
// import Results from './views/InvoiceItems/InvoiceResults/InvoiceResults';
// import Details from './containers/Details/Details';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Container from '@material-ui/core/Container';
import InvoiceItems from './views/InvoiceItems/InvoiceItems';

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
            <Route path="/details">
              {/* <Details /> */}
              <p>details</p>
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
