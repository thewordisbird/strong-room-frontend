import React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withAuth, withAuthProps } from '../Firebase/Auth/withAuth';
import { NavLink } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Button } from '@material-ui/core'


const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    '&:hover': {
      fontWeight: 'bold'
    }
  },
  selected: {
    textDecoration: 'underline'
  }
})

type NavBarProps = WithStyles<typeof styles>  & RouteComponentProps & withAuthProps & {
  title: string;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const {logoutUser, isAuthenticated, title,  history, classes } = props
  const handleLogout = () => {
    logoutUser().then(() => {
      history.push('/auth')
    }) 
  }

  return (
  <div className={classes.root}>
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {isAuthenticated 
            ? (<>
                <Typography>
                  <NavLink className={classes.navLink} to="/" activeClassName={classes.selected} exact>Invoices</NavLink>
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>)
          : <Button color="inherit">Login</Button> }
        </Toolbar>
      </Container>
    </AppBar>
  </div>
)}

export default withRouter(withStyles(styles)(withAuth(NavBar)));