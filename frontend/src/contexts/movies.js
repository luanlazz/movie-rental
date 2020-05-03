import React, { createContext, useState } from 'react'
import { api } from 'services'
import t from 'prop-types'

const MovieContext = createContext()

function MovieProvider ({ children }) {
  const [movies, setMovies] = useState([])
  const [fetchingMovie, setFetchingMovie] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function getMovies () {
    setFetchingMovie(true)
    const docs = []

    try {
      await api.get('/movies', null)
        .then(res => {
          res.data.forEach(movie => {
            docs.push({
              ...movie
            })
          })
        })
        .catch((res) => {
          setErrorMessage(res.response.data)
        })

      setMovies(docs)
    } catch (error) {
      console.error('Erro: ', error)
    }

    setFetchingMovie(false)
  }

  return (
    <MovieContext.Provider value={{
      getMovies,
      movies,
      fetchingMovie,
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
