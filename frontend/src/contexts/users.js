import React, { createContext, useState } from 'react'
import t from 'prop-types'
import { api } from 'services'

const UsersContext = createContext()

function UsersProvider ({ children }) {
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [fetchingUsers, setFetchingUsers] = useState(false)

  async function getUsers () {
    setFetchingUsers(true)

    const docs = []

    try {
      await api.get('/users')
        .then(res => {
          res.data.forEach(user => {
            docs.push({
              ...user
            })
          })
        })
        .catch(res => {
          setErrorMessage(res.response.data)
        })

      setUsers(docs)
    } catch (error) {
      console.error('Error: ', error)
    }

    setFetchingUsers(false)
  }

  async function getUser (id) {
    setFetchingUsers(true)

    try {
      await api.get(`/users/${id}`)
        .then(res => {
          return res.data[0]
        })
        .catch(res => {
          setErrorMessage(res.response.data)
        })
    } catch (error) {
      console.error('Error: ', error)
    }

    setFetchingUsers(false)
  }

  async function saveUser (user) {
    setFetchingUsers(true)

    const url = user.userId ? `/users/${user.userId}` : '/signup'

    try {
      await api.post(url, user)
        .then(() => {
          console.log('salvo com sucesso')
        })
        .catch(res => {
          console.log(res.response.data)
          setErrorMessage(res.response.data)
        })
    } catch (error) {
      console.error('Error: ', error)
    }

    setFetchingUsers(false)
  }

  return (
    <UsersContext.Provider value={{
      getUsers,
      getUser,
      saveUser,
      users,
      errorMessage,
      fetchingUsers
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
