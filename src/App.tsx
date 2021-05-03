import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Results from './containers/Results/Results';
import Search from './containers/Search/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"; 
import Details from './containers/Details/Details';
type AppProps = {};

type AppState = {
  searchQuery: {vendor?: string | null, startDate?: Date | null, endDate?: Date | null}
}


class App extends Component<AppProps, AppState> {
  state = {
    searchQuery: {}
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
      <Container maxWidth="md">
        <div className='App'>
          <Router>
            <Switch>
              <Route path="/details">
                <Details />
              </Route>
              <Route path="/">
                <Search onChange={this.onSearchParamChange}/>
                <Results queryParams={this.state.searchQuery} />
              </Route>
            </Switch>
          </Router>
        </div>
      </Container>
    
    
  );
  }
  
}

export default App;
