import React, {useEffect} from 'react';
import NavBar from './shared/Navbar/Navbar';
import InvoiceItems from './views/InvoiceItems/InvoiceItems';
import InvoiceDetails from './views/InvoiceDetails/InvoiceDetails';
import Login from './views/Auth/Login';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"; 
import { useAuth } from './shared/Firebase/Auth/AuthProvider';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    console.log('reloading app', isAuthenticated)
  }, [isAuthenticated])

  const authenticatedRoutes = (
    <Switch>
      {/* <Route path="/details"><InvoiceDetails /></Route>
      <Route path="/"><InvoiceItems /></Route> */}
      <Route path="/"><p>Authenticated</p></Route>
    </Switch>
  )

  const nonAuthenticatedRoutes = (
    <Switch>
      <Route path="/"><Login /></Route>
      <Redirect to="/" />
      {/* <Route path="/"><p>Not authenticated</p></Route> */}
    </Switch>
  )

  return (
    <Router>
      <NavBar title="Burbank Square"/>
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
