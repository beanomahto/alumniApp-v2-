// UserContext.jsx
import { useState } from 'react'
import { UserContext } from './userContext'

const UserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
