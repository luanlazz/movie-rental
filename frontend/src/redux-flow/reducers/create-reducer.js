const createReducer = (initialState, handleActions) => {
  if (typeof initialState === 'undefined') throw new Error('Initial state should not be undefined')
  if (Object.prototype.toString.call(handleActions) === '[object object]') throw new Error('createReducer expects the second argument as an object representing reducer')

  return (state = initialState, action) =>
    (Object.prototype.hasOwnProperty.call(handleActions, (action.type)))
      ? handleActions[action.type](state, action)
      : state
}

export default createReducer
