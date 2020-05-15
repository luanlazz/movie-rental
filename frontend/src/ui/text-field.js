import React from 'react'
import t from 'prop-types'
import {
  Grid,
  TextField as MaterialTextField
} from '@material-ui/core'

function TextField ({ xs, ...props }) {
  return (
    <Grid item xs={xs}>
      <MaterialTextField
        variant='standard'
        fullWidth
        {...props}
      />
    </Grid>
  )
}

TextField.propTypes = {
  xs: t.number
}

export default TextField
