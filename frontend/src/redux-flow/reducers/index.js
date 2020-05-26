import { combineReducers } from 'redux'
import authUser from './auth-user'
import snackbar from './snackbars'

export default combineReducers({
  authUser,
  snackbar
})
