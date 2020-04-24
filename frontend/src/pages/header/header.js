import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar as MaterialToolbar,
  IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Logo from './logo'
import { Link } from 'react-router-dom'
import { HOME } from 'routes'

function Header ({ handleAsideMenu }) {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton onClick={handleAsideMenu}>
          <MenuIcon
            fontSize='inherit'
          />
        </IconButton>

        <Link to={HOME}>
          <Logo />
        </Link>

        <IconButton edge='end'>
          <ShoppingCartIcon fontSize='inherit' />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  handleAsideMenu: t.func
}

const Toolbar = styled(MaterialToolbar)`
  && {
    display: flex;
    justify-content: space-between;
  }
`

export default Header
