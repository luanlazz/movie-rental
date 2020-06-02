import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  TextField as MaterialTextField
} from '@material-ui/core'

function TextField ({ xs, ...props }) {
  return (
    <Grid item xs={xs}>
      <MaterialTextField
        {...props}
        variant='standard'
        fullWidth
      />
    </Grid>
  )
}

TextField.propTypes = {
  xs: PropTypes.number
}

export default TextField
