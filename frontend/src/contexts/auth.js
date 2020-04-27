import React, { createContext, useState } from 'react'
import { api } from 'services'
import t from 'prop-types'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [fetchingUser, setFetchingUser] = useState(false)

  async function login (user) {
    setFetchingUser(true)
    try {
      await api.post('/signin', user)
        .then(res => {
          setUserInfo({
            isUserLoggedIn: true,
            user: res.data
          })
          setErrorMessage('')
        })
        .catch(res => {
          setErrorMessage(res.response.data)
        })
    } catch (eror) {
      console.log('Erro ao logar')
    }
    setFetchingUser(false)
  }

  function logout () {
    setUserInfo({
      isUserLoggedIn: false,
      user: null
    })
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userInfo,
      errorMessage,
      fetchingUser
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
