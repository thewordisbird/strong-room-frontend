import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';



const NavBar = () => {
  return (
    <div className="">
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className="" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="">
          Burbank Square
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </div>
  )
}

export default NavBar;