import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authUser from './auth-user'
import snackbar from './snackbars'

export default (history) => combineReducers({
  router: connectRouter(history),
  authUser,
  snackbar
})
