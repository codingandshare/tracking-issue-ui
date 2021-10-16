import { useContext, useState } from 'react'
import { Form } from 'antd'
import { showError, showSuccess } from 'common/notify.utils'
import { AppContext } from 'contexts/app.context'
import { useTranslation } from 'react-i18next'
import { changePassword, updateUser } from 'services/user.service'

const UserInfoHook = () => {
  const [loading, setLoading] = useState(false)
  const [changing, setChanging] = useState(false)
  const { onLoadUserInfo } = useContext(AppContext)
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const onUpdateUser = (user) => {
    setLoading(true)
    updateUser(user)
      .then(() => {
        showSuccess(t('Update user successfully'))
        form.resetFields()
        onLoadUserInfo(() => {
          setLoading(false)
        })
      })
      .catch((error) => {
        setLoading(false)
        showError(error)
      })
  }

  const onChangePass = (password) => {
    setChanging(true)
    delete password.reNewPassword
    changePassword(password)
      .then(() => {
        form.resetFields()
        showSuccess(t('Change password successfully'))
      })
      .catch(showError)
      .finally(() => {
        setChanging(false)
      })
  }

  return {
    loading,
    onUpdateUser,
    onChangePass,
    changing,
    form
  }
}

export default UserInfoHook
