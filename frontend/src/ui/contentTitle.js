import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { H3 } from './title'

function contentTitle ({ title }) {
  return (
    <GridTitle>
      <Grid item xs={12}>
        <H3>{title}</H3>
      </Grid>
    </GridTitle>
  )
}

contentTitle.propTypes = {
  title: PropTypes.string.isRequired
}

const GridTitle = styled(Grid).attrs({
  container: true
})`
  && {
    display: block;
    margin: auto;
  }
`

export default contentTitle
