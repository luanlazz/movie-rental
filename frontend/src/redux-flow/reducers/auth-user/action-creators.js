import { api } from 'services'
import {
  LOGIN_USER,
  LOGOUT_USER,
  VALIDATE_TOKEN_USER,
  SET_USER_AUTH,
  SET_MESSAGE_AUTH,
  FETCHING_AUTH
} from './actions'

export const loginUser = (user) => async (dispatch) => {
  try {
    await api.post('/signin', user)
      .then(res => {
        const { user, token } = res.data
        dispatch({
          type: LOGIN_USER,
          payload: { user, token }
        })
      })
      .catch(res => {
        dispatch(setMessage(res.response.data))
      })
  } catch (error) {
    console.error('Erro in login', error)
  }
}

export const setUserAuth = (name, value) => (dispatch) => {
  try {
    dispatch({
      type: SET_USER_AUTH,
      payload: { name, value }
    })
  } catch (error) {
    console.error('Erro in setUser', error)
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
    console.error('Error in logout', error)
  }
}

export const validateToken = (user) => async (dispatch) => {
  try {
    await api.post('/validateToken', user)
      .then(res => {
        dispatch({
          type: VALIDATE_TOKEN_USER,
          payload: {
            value: res.data
          }
        })
        api.defaults.headers.common.Authorization = `Bearer ${user.token}`
      })
      .catch(res => {
        console.log(res.response.data)
      })
  } catch (error) {
    console.error('Error in validate token', error)
  }
}
