import React from 'react'
// import styled from 'styled-components'
import {
  Grid
} from '@material-ui/core'
import {
  HeaderContent,
  H4
} from 'ui'

function Subscription () {
  return (
    <Grid container>
      <HeaderContent title='Planos de assinatura' />

      <Grid container>
        <Grid item>
          <H4>Plano basico</H4>
          <H4>Plano intermediario</H4>
          <H4>Plano top</H4>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Subscription
