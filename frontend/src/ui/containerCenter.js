import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

function ContainerCenter ({ children }) {
  return (
    <GridContainer>
      {children}
    </GridContainer>
  )
}

ContainerCenter.propTypes = {
  children: PropTypes.node.isRequired
}

const GridContainer = styled(Grid).attrs({
  container: true,
  justify: 'center',
  align: 'center',
  spacing: 2
})`
  && {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`

export default ContainerCenter
