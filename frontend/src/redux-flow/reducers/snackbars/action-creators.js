import { SNACKBAR_OPEN, SNACKBAR_CLEAR } from './actions'

export const openSnackbar = (message, severity) => (dispatch) => {
  dispatch({
    type: SNACKBAR_OPEN,
    payload: {
      snackbarMessage: message,
      alertSeverity: severity
    }
  })
}

export const clearSnackbar = () => (dispatch) => {
  dispatch({
    type: SNACKBAR_CLEAR
  })
}
