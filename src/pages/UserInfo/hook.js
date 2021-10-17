import { useCallback, useContext, useState } from 'react'
import { showError, showSuccess } from 'common/notify.utils'
import { AppContext } from 'contexts/app.context'
import { useTranslation } from 'react-i18next'
import { changePassword, updateUser } from 'services/user.service'

const UserInfoHook = () => {
  const [loading, setLoading] = useState(false)
  const [changing, setChanging] = useState(false)
  const { onLoadUserInfo } = useContext(AppContext)
  const { t } = useTranslation()

  const onUpdateUser = useCallback(
    (user) => {
      setLoading(true)
      updateUser(user)
        .then(() => {
          showSuccess(t('Update user successfully'))
          onLoadUserInfo(() => {
            setLoading(false)
          })
        })
        .catch((error) => {
          setLoading(false)
          showError(error)
        })
    },
    [updateUser]
  )

  const onChangePass = useCallback(
    (password) => {
      setChanging(true)
      delete password.reNewPassword
      changePassword(password)
        .then(() => {
          showSuccess(t('Change password successfully'))
        })
        .catch(showError)
        .finally(() => {
          setChanging(false)
        })
    },
    [changePassword]
  )

  return {
    loading,
    onUpdateUser,
    onChangePass,
    changing
  }
}

export default UserInfoHook
