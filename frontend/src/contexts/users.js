import React, { createContext, useState } from 'react'
import t from 'prop-types'
import { api } from 'services'

const UsersContext = createContext()

function UsersProvider ({ children }) {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState({
    msg: '',
    severity: 'error'
  })

  function handleError (msg) {
    setError({
      ...error,
      msg
    })
  }

  async function getUsers () {
    try {
      setFetching(true)
      const res = await api.get('/users')
      setFetching(false)

      return res.data
    } catch (error) {
      handleError(error.response.data)
      setFetching(false)
    }
  }

  async function getUser (id) {
    try {
      setFetching(true)
      const res = await api.get(`/users/${id}`)
      setFetching(false)

      return res.data
    } catch (error) {
      handleError(error.response.data)
      setFetching(false)
    }
  }

  async function saveUser (user) {
    try {
      const url = user.userId ? `/users/${user.userId}` : '/signup'

      setFetching(true)
      const res = await api.post(url, user)
      setFetching(false)

      return res.status === 204
    } catch (error) {
      console.log('resposta save', error.response.data)
      handleError(error.response.data)
      setFetching(false)
    }
  }

  async function forgotPassword (payload) {
    try {
      setFetching(true)
      const res = await api.post('/forgot-password', payload)
      setFetching(false)

      return res.status === 204
    } catch (error) {
      handleError(error.response.data)
      setFetching(false)
    }
  }

  async function resetPassword (payload) {
    try {
      setFetching(true)
      const res = await api.post('/reset-password', payload)
      setFetching(false)

      return res.status === 204
    } catch (error) {
      handleError(error.response.data)
      setFetching(false)
    }
  }

  return (
    <UsersContext.Provider value={{
      getUsers,
      getUser,
      saveUser,
      forgotPassword,
      resetPassword,
      fetching,
      error
    }}
    >
      {children}
    </UsersContext.Provider>
  )
}

UsersProvider.propTypes = {
  children: t.node.isRequired
}

export { UsersProvider, UsersContext }
