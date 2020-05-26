import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { clearSnackbar } from 'redux-flow/reducers/snackbars/action-creators'

function SnackbarHandle ({ snackbar, clearSnackbarState }) {
  const handleClose = () => {
    clearSnackbarState()
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={snackbar.snackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      aria-describedby='client-snackbar'
    >
      <Alert onClose={handleClose} severity={snackbar.alertSeverity}>
        {snackbar.snackbarMessage}
      </Alert>
    </Snackbar>
  )
}

SnackbarHandle.propTypes = {
  snackbar: PropTypes.object.isRequired,
  clearSnackbarState: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  snackbar: state.snackbar
})

const mapDispatchToProps = (dispatch) => ({
  clearSnackbarState: () => {
    dispatch(clearSnackbar())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarHandle)
