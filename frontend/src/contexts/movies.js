import React, { createContext, useState } from 'react'
import { api } from 'services'
import t from 'prop-types'

const MovieContext = createContext()

function MovieProvider ({ children }) {
  const [fetching, setFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function getMovies () {
    try {
      setFetching(true)
      const res = await api.get('/movies', null)
      setFetching(false)

      return res.data
    } catch (error) {
      setErrorMessage(error.response.data)
      setFetching(false)
    }
  }

  return (
    <MovieContext.Provider value={{
      getMovies,
      fetching,
      errorMessage
    }}
    >
      {children}
    </MovieContext.Provider>
  )
}

MovieProvider.propTypes = {
  children: t.node.isRequired
}

export { MovieProvider, MovieContext }
