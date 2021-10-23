import { useState, useEffect, useCallback } from 'react'
import { getUserInfo } from 'services/user.service'
import { fetchMetaDataInfo } from 'services/tracking.service'
import { getToken, clearLogin } from 'services/storage.service'
import { isNil, isFunction } from 'common/func.utils'
import { showError } from 'common/notify.utils'

const UserContext = () => {
  const [user, setUser] = useState()
  const [isSignIned, setIsSignIned] = useState(false)
  const [metaData, setMetaData] = useState({})

  const onLoadUserInfo = useCallback(
    (callback) => {
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
    },
    [getUserInfo]
  )

  const onLogout = useCallback(() => {
    setUser(null)
    setIsSignIned(false)
    clearLogin()
  }, [clearLogin])

  useEffect(() => {
    if (!isNil(getToken())) {
      onLoadUserInfo()
      fetchMetaDataInfo().then((responses) => {
        const userData = responses[0].data
        const metaData = responses[1].data
        setMetaData({
          users: userData,
          metas: metaData
        })
      })
    }
  }, [getToken])

  return {
    user,
    isSignIned,
    onLoadUserInfo,
    onLogout,
    metaData
  }
}

export default UserContext
