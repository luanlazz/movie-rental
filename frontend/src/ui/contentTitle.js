import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { H3 } from './title'

function contentTitle ({ title }) {
  return (
    <Header>
      <Grid item xs={12}>
        <H3>{title}</H3>
      </Grid>
    </Header>
  )
}

contentTitle.propTypes = {
  title: t.string.isRequired
}

const Header = styled(Grid).attrs({
  container: true
})`
  && {
    display: block;
    margin: auto;
  }
`

export default contentTitle
