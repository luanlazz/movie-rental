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
import { NavLinkHandle } from 'components'
import { Logo } from 'ui'
import { HOME } from 'routes'

function Header ({ handleDrawerOpen }) {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>

        <NavLinkHandle to={HOME}>
          <Logo />
        </NavLinkHandle>

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
    background: ${({ theme }) => theme.palette.grey[800]};
    border-bottom: 0.2rem solid ${({ theme }) => theme.palette.primary.main};
    display: flex;
    justify-content: space-between;
  }
`

const IconButton = styled(MaterialIconButton)`
  color: ${({ theme }) => theme.palette.common.white};
`

export default Header
