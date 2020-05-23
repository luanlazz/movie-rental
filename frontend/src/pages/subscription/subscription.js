import React from 'react'
// import styled from 'styled-components'
import {
  Grid
} from '@material-ui/core'
import {
  ContentTitle,
  H4
} from 'ui'

function Subscription () {
  return (
    <>
      <ContentTitle title='Planos de assinatura' />

      <Grid container>
        <Grid item>
          <H4>Plano basico</H4>
          <H4>Plano intermediario</H4>
          <H4>Plano top</H4>
        </Grid>
      </Grid>
    </>
  )
}

export default Subscription
