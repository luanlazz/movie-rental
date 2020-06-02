import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink as MaterialNavLink } from 'react-router-dom'

const NavLinkHandle = ({ to, children, props }) => (
  <NavLink to={to} {...props}>
    {children}
  </NavLink>
)

NavLinkHandle.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  props: PropTypes.object
}

const NavLink = styled(MaterialNavLink)`
  && {
    color: black;
    text-decoration: none;
  }
`

export default NavLinkHandle
