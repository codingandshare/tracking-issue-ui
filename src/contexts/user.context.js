import { useState, useEffect } from 'react'
import { getUserInfo } from 'services/user.service'
import { getToken, clearLogin } from 'services/storage.service'
import { isNil, isFunction } from 'common/func.utils'
import { showError } from 'common/notify.utils'

const UserContext = () => {
  const [user, setUser] = useState()
  const [isSignIned, setIsSignIned] = useState(false)

  const onLoadUserInfo = (callback) => {
    getUserInfo()
      .then((res) => {
        setUser(res)
        setIsSignIned(true)
        if (isFunction(callback)) {
          callback()
        }
      })
      .catch((error) => {
        setIsSignIned(false)
        showError(error)
      })
  }

  const onLogout = () => {
    setUser(null)
    setIsSignIned(false)
    clearLogin()
  }

  useEffect(() => {
    if (!isNil(getToken())) {
      onLoadUserInfo()
    }
  }, [])

  return {
    user,
    isSignIned,
    onLoadUserInfo,
    onLogout
  }
}

export default UserContext
