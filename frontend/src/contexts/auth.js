import React, { createContext, useState } from 'react'
import { api } from 'services'
import t from 'prop-types'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [fetchingUser, setFetchingUser] = useState(false)
  const [tokenStatus, setTokenStatus] = useState(false)

  async function login (user) {
    setFetchingUser(true)

    try {
      await api.post('/signin', user)
        .then(async res => {
          setErrorMessage('')
          await validateToken(res.data)
        })
        .catch(res => {
          setErrorMessage(res.response.data)
        })
    } catch (error) {
      logout()
      console.error('Erro ao logar', error)
    }

    setFetchingUser(false)
  }

  function logout () {
    setUserInfo({})
    setTokenStatus(false)
    localStorage.removeItem('__user')
  }

  async function validateToken (userParam) {
    setTokenStatus(false)

    const userStorage = await JSON.parse(localStorage.getItem('__user'))

    const user = userParam || userStorage
    localStorage.removeItem('__user')

    if (!user) {
      setTokenStatus(false)
      return
    }

    try {
      await api.post('/validateToken', user)
        .then(res => {
          setUserInfo(user)
          setTokenStatus(res.data)
          localStorage.setItem('__user', JSON.stringify(user))
          api.defaults.headers.common.Authorization = `Bearer ${user.token}`
        })
        .catch(res => {
          localStorage.removeItem('__user')
          console.error('Erro ao validar token')
        })
    } catch (error) {
      localStorage.removeItem('__user')
    }
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      validateToken,
      userInfo,
      errorMessage,
      fetchingUser,
      tokenStatus
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: t.node
}

export { AuthProvider, AuthContext }
