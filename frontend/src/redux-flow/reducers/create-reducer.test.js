import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import createReducer from './create-reducer'

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const initialState = 0
const reducer = createReducer(initialState, {
  INCREMENT: (state, action) => state + 1,
  DECREMENT: (state, action) => state - 1
})

it('createReducer should be a function', () => {
  expect(createReducer).to.be.a('function')
})

it('createReducer(initialState, {}) should return a function', () => {
  expect(createReducer([], {})).to.be.a('function')
})

it('should create a reducer', () => {
  const before = 0
  const action = deepFreeze({ type: INCREMENT })
  const after = 1
  expect(reducer(before, action)).to.be.equal(after)
})

it('reducer should return latest state if action is unknown', () => {
  const before = 3
  const action = deepFreeze({ type: 'UNKNOWN' })
  const after = 3
  expect(reducer(before, action)).to.be.equal(after)
})

it('initialState should not be undefined', () => {
  try {
    createReducer()
  } catch (error) {
    expect(error.message).to.be.equal('Initial state should not be undefined')
  }
})

it('handleActions should not be diferent from object', () => {
  try {
    createReducer([])
  } catch (error) {
    expect(error.message).to.be.equal('createReducer expects the second argument as an object representing reducer')
  }
})
