import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const ButtonHandle = ({ className, onClick, children, props }) => (
  <ButtonComponent className={className} onClick={onClick} {...props}>
    {children}
  </ButtonComponent>
)

ButtonHandle.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  props: PropTypes.object,
  children: PropTypes.node
}

const ButtonComponent = styled(Button).attrs({
})`
  color: ${({ theme }) => theme.palette.common.white};

  &.danger {
    background-color: ${({ theme }) => theme.palette.danger.main};
  }

  &.success {
    background-color: ${({ theme }) => theme.palette.success.main};
  }

  &.submit {
    background-color: ${({ theme }) => theme.palette.button.primary.main};
  }

  &.secondary {
    background-color: ${({ theme }) => theme.palette.secondary.light};
  }
`

export default ButtonHandle
