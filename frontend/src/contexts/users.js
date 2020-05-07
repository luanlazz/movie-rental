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

  return (
    <UsersContext.Provider value={{
      getUsers,
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
