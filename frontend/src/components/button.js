import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

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
    background-color: ${({ theme }) => theme.palette.primary.light};
  }

  &.secondary {
    background-color: ${({ theme }) => theme.palette.secondary.light};
  }
`

export const ButtonDanger = (props) => <ButtonComponent className='danger' {...props} />
export const ButtonSuccess = (props) => <ButtonComponent className='success' {...props} />
export const ButtonSubmit = (props) => <ButtonComponent className='submit' {...props} />
export const ButtonSecondary = (props) => <ButtonComponent className='secondary' {...props} />

export default Button
