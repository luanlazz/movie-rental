import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar as MaterialToolbar,
  IconButton as MaterialIconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Logo } from 'ui'
import { Link } from 'react-router-dom'
import { HOME } from 'routes'

function Header ({ handleDrawerOpen }) {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>

        <Link to={HOME}>
          <Logo />
        </Link>

        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  handleDrawerOpen: t.func
}

const Toolbar = styled(MaterialToolbar)`
  && {
    border-bottom: 0.2rem solid ${({ theme }) => theme.palette.secondary.main};
    display: flex;
    justify-content: space-between;
  }
`

const IconButton = styled(MaterialIconButton)`
  color: ${({ theme }) => theme.palette.common.white};
`

export default Header
