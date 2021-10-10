import { useState } from 'react'

const UserContext = () => {
  const [user, setUser] = useState(null)

  return {
    user,
    setUser
  }
}

export default UserContext
