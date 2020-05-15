import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import user, { initialState } from './index'
import {
  LOGIN_USER,
  LOGOUT_USER,
  VALIDATE_TOKEN_USER,
  SET_USER_AUTH,
  SET_MESSAGE_AUTH
} from './actions'

it('user should be a function', () => {
  expect(user).to.be.a('function')
})

it('setUser should change the email of the user', () => {
  const before = {
    ...initialState,
  }
  const action = deepFreeze({
    type: SET_USER_AUTH,
    payload: {
      name: 'email',
      value: 'luanlazzari@hotmail.com'
    }
  })
  const after = {
    ...initialState,
    user: {
      email: 'luanlazzari@hotmail.com'
    }
  }
  expect(user(before, action)).to.be.deep.equal(after)
})

it('setUser should change the password of the user', () => {
  const before = {
    ...initialState,
    user: {
      email: 'luanlazzari@hotmail.com'
    }
  }
  const action = deepFreeze({
    type: SET_USER_AUTH,
    payload: {
      name: 'password',
      value: '12345'
    }
  })
  const after = {
    ...initialState,
    user: {
      email: 'luanlazzari@hotmail.com',
      password: '12345'
    }
  }
  expect(user(before, action)).to.be.deep.equal(after)
})

it('setMessage should change the message', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SET_MESSAGE_AUTH,
    payload: {
      message: 'Error in login'
    }
  })
  const after = {
    ...initialState,
    message: 'Error in login'
  }
  expect(user(before, action)).to.be.deep.equal(after)
})

it('setFetching should change the state to true or false', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SET_MESSAGE_AUTH,
    payload: { fetching: true }
  })
  const after = {
    ...initialState,
    fetching: true
  }
  expect(user(before, action)).to.be.deep.equal(after)
})

it('Login user should store infos about the user', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: LOGIN_USER,
    payload: {
      user: {
        firstName: 'Luan',
        lastName: 'Lazzari',
        email: 'luanlazzari@hotmail.com'
      },
      token: '123456'
    }
  })
  const after = {
    logged: true,
    token: '123456',
    validateToken: false,
    message: '',
    fetching: false,
    user: {
      firstName: 'Luan',
      lastName: 'Lazzari',
      email: 'luanlazzari@hotmail.com'
    }
  }
  expect(user(before, action)).to.be.deep.equal(after)
})

it('validateToken should store the token', () => {
  const before = {
    logged: true,
    token: '123456',
    validateToken: false,
    message: '',
    user: {
      name: 'Luan',
      lastName: 'Lazzari',
      email: 'luanlazzari@hotmail.com'
    }
  }
  const action = deepFreeze({
    type: VALIDATE_TOKEN_USER,
    payload: {
      value: true
    }
  })
  const after = {
    logged: true,
    token: '123456',
    validateToken: true,
    message: '',
    user: {
      name: 'Luan',
      lastName: 'Lazzari',
      email: 'luanlazzari@hotmail.com'
    }
  }
  expect(user(before, action)).to.be.deep.equal(after)
})

it('logoutUser should change the state "logged" in store', () => {
  const before = {
    logged: true,
    token: '123456',
    validateToken: true,
    message: '',
    user: {
      name: 'Luan',
      lastName: 'Lazzari',
      email: 'luanlazzari@hotmail.com'
    }
  }
  const action = deepFreeze({
    type: LOGOUT_USER
  })
  const after = {
    ...initialState
  }
  expect(user(before, action)).to.be.deep.equal(after)
})
