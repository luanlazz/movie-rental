import { useContext } from 'react'
import { MovieContext } from 'contexts'

function useMovie () {
  return useContext(MovieContext)
}

export default useMovie
