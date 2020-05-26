import { api } from 'services'
import {
  LOGIN_USER,
  LOGOUT_USER,
  VALIDATE_TOKEN_USER,
  SET_USER_AUTH,
  SET_MESSAGE_AUTH,
  FETCHING_AUTH
} from './actions'

export const loginUser = (userParam) => async (dispatch) => {
  try {
    const res = await api.post('/signin', userParam)

    const { user, token } = res.data

    dispatch({
      type: LOGIN_USER,
      payload: { user, token }
    })
  } catch (error) {
    dispatch(setMessage(error.response.data))
  }
}

export const setUserAuth = (name, value) => (dispatch) => {
  try {
    dispatch({
      type: SET_USER_AUTH,
      payload: { name, value }
    })
  } catch (error) {
    dispatch(setMessage(error.response.data))
  }
}

export const setMessage = (message) => ({
  type: SET_MESSAGE_AUTH,
  payload: { message }
})

export const setFetching = (fetching) => ({
  type: FETCHING_AUTH,
  payload: { fetching }
})

export const logoutUser = () => async (dispatch) => {
  try {
    await dispatch({
      type: LOGOUT_USER
    })
  } catch (error) {
    dispatch(setMessage(error.response.data))
  }
}

export const validateToken = (userParam) => async (dispatch) => {
  try {
    const res = await api.post('/validate-token', userParam)

    dispatch({
      type: VALIDATE_TOKEN_USER,
      payload: {
        value: res.data
      }
    })

    api.defaults.headers.common.Authorization = `Bearer ${userParam.token}`

    return true
  } catch (error) {
    dispatch(setMessage(error.response.data))
    return false
  }
}
