import { useState, useEffect } from 'react'
import { getUserInfo } from 'services/user.service'
import { getToken } from 'services/storage.service'
import { isNil } from 'common/func.utils'
import { showError } from 'common/notify.utils'

const UserContext = () => {
  const [user, setUser] = useState()
  const [isSignIned, setIsSignIned] = useState(false)

  const onLoadUserInfo = () => {
    getUserInfo()
      .then((res) => {
        setUser(res)
        setIsSignIned(true)
      })
      .catch((error) => {
        setIsSignIned(false)
        showError(error)
      })
  }

  useEffect(() => {
    if (!isNil(getToken())) {
      onLoadUserInfo()
    }
  }, [])

  return {
    user,
    isSignIned,
    onLoadUserInfo
  }
}

export default UserContext
