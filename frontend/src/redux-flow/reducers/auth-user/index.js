import createReducer from '../create-reducer'
import {
  LOGIN_USER,
  LOGOUT_USER,
  VALIDATE_TOKEN_USER,
  FETCHING_AUTH,
  SET_USER_AUTH,
  SET_MESSAGE_AUTH
} from './actions'

export const initialState = {
  logged: false,
  token: '',
  validateToken: false,
  message: '',
  fetching: false,
  user: {}
}

const user = createReducer(initialState, {
  [LOGIN_USER]: (state, action) => ({
    ...state,
    logged: true,
    ...action.payload
  }),
  [LOGOUT_USER]: (state, action) => ({
    ...state,
    ...initialState
  }),
  [SET_USER_AUTH]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      [action.payload.name]: action.payload.value
    }
  }),
  [VALIDATE_TOKEN_USER]: (state, action) => ({
    ...state,
    validateToken: action.payload.value
  }),
  [SET_MESSAGE_AUTH]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [FETCHING_AUTH]: (state, action) => ({
    ...state,
    ...action.payload
  })
})

export default user
