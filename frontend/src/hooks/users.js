import { useContext } from 'react'
import { UsersContext } from 'contexts'

function useUsers () {
  return useContext(UsersContext)
}

export default useUsers
