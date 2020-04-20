import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Link } from 'react-router-dom'
import { HOME } from 'routes'

function Header () {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start'>
          <MenuIcon fontSize='inherit' />
        </IconButton>

        <Link to={HOME}>
          <img src='images/logo-store' />
        </Link>

        <IconButton edge='end'>
          <ShoppingCartIcon fontSize='inherit' />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
