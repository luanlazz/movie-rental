import React from 'react'
import { withStyles } from '@material-ui/core'

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

export default Spacer
