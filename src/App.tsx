import * as React from 'react';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import NavBar from './shared/Navbar/Navbar';
import InvoiceItems from './views/InvoiceItems/InvoiceItems';
import InvoiceDetails from './views/InvoiceDetails/InvoiceDetails';
import Login from './views/Auth/Login';
import { useAuth } from './shared/Firebase/Auth/AuthProvider';

function App(): JSX.Element {
  const { isAuthenticated } = useAuth();

  const authenticatedRoutes = (
    <Switch>
      <Route path="/details"><InvoiceDetails /></Route>
      <Route path="/"><InvoiceItems /></Route>
    </Switch>
  );

  const nonAuthenticatedRoutes = (
    <Switch>
      <Route path="/"><Login /></Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Router>
      <NavBar title="Burbank Square" />
      <Container maxWidth="md">
        {
          isAuthenticated
            ? authenticatedRoutes
            : nonAuthenticatedRoutes
        }
      </Container>
    </Router>
  );
}

export default App;
