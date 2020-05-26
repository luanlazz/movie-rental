import createReducer from '../create-reducer'
import { SNACKBAR_OPEN, SNACKBAR_CLEAR } from './actions'

export const initialState = {
  snackbarOpen: false,
  snackbarMessage: '',
  alertSeverity: ''
}

const snackbar = createReducer(initialState, {
  [SNACKBAR_OPEN]: (state, action) => ({
    ...state,
    snackbarOpen: true,
    ...action.payload
  }),
  [SNACKBAR_CLEAR]: (state, action) => ({
    ...state,
    snackbarOpen: false
  })
})

export default snackbar
