import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Results from './containers/Results/Results';
import Search from './containers/Search/Search';
// import { render } from '@testing-library/react';
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
    <div className='App'>
      <Container maxWidth="md">
      <Search onChange={this.onSearchParamChange}/>
      <Results queryParams={this.state.searchQuery} />
    </Container>
    </div>
    
  );
  }
  
}

export default App;
