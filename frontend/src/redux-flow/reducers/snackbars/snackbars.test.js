import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import snackbar, { initialState } from './index'
import { SNACKBAR_OPEN, SNACKBAR_CLEAR } from './actions'

it('Snackbar should be a function', () => {
  expect(snackbar).to.be.a('function')
})

it('SNACKBAR_OPEN should set the snackbar state to "open" and message: "teste" "', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SNACKBAR_OPEN,
    payload: {
      snackbarMessage: 'teste'
    }
  })
  const after = {
    ...initialState,
    snackbarOpen: true,
    snackbarMessage: 'teste'
  }
  expect(snackbar(before, action)).to.be.deep.equal(after)
})

it('SNACKBAR_OPEN should set the snackbar "open" and " message: "teste 2" "', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SNACKBAR_OPEN,
    payload: {
      snackbarMessage: 'teste 2'
    }
  })
  const after = {
    ...initialState,
    snackbarOpen: true,
    snackbarMessage: 'teste 2'
  }
  expect(snackbar(before, action)).to.be.deep.equal(after)
})

it('SNACKBAR_CLEAR should set the snackbar "closed"', () => {
  const before = {
    ...initialState,
    snackbarOpen: true
  }
  const action = deepFreeze({
    type: SNACKBAR_CLEAR
  })
  const after = {
    ...initialState,
    snackbarOpen: false
  }
  expect(snackbar(before, action)).to.be.deep.equal(after)
})

it('SNACKBAR_OPEN should set the snackbar severity "success"', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SNACKBAR_OPEN,
    payload: {
      alertSeverity: 'success'
    }
  })
  const after = {
    ...initialState,
    snackbarOpen: true,
    alertSeverity: 'success'
  }
  expect(snackbar(before, action)).to.be.deep.equal(after)
})

it('SNACKBAR_OPEN should set the snackbar severity "error"', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SNACKBAR_OPEN,
    payload: {
      alertSeverity: 'error'
    }
  })
  const after = {
    ...initialState,
    snackbarOpen: true,
    alertSeverity: 'error'
  }
  expect(snackbar(before, action)).to.be.deep.equal(after)
})

it('SNACKBAR_OPEN should set the snackbar severity "warning"', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SNACKBAR_OPEN,
    payload: {
      alertSeverity: 'warning'
    }
  })
  const after = {
    ...initialState,
    snackbarOpen: true,
    alertSeverity: 'warning'
  }
  expect(snackbar(before, action)).to.be.deep.equal(after)
})

it('SNACKBAR_OPEN should set the snackbar severity "info"', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SNACKBAR_OPEN,
    payload: {
      alertSeverity: 'info'
    }
  })
  const after = {
    ...initialState,
    snackbarOpen: true,
    alertSeverity: 'info'
  }
  expect(snackbar(before, action)).to.be.deep.equal(after)
})

it('SNACKBAR_OPEN should set the snackbar open, message and severity ', () => {
  const before = {
    ...initialState
  }
  const action = deepFreeze({
    type: SNACKBAR_OPEN,
    payload: {
      snackbarMessage: 'Cadastro realizado com sucesso!',
      alertSeverity: 'info'
    }
  })
  const after = {
    ...initialState,
    snackbarOpen: true,
    snackbarMessage: 'Cadastro realizado com sucesso!',
    alertSeverity: 'info'
  }
  expect(snackbar(before, action)).to.be.deep.equal(after)
})

