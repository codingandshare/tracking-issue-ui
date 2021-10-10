import { useContext, useState } from 'react'
import { login } from 'services/authen.service'
import { showError } from 'common/notify.utils'
import { setToken } from 'services/storage.service'
import { AppContext } from 'contexts/app.context'
import { Form } from 'antd'
import { useHistory } from 'react-router'

const LoginHook = () => {
  const [loading, setLoading] = useState(false)
  const { onLoadUserInfo } = useContext(AppContext)
  const [form] = Form.useForm()
  const history = useHistory()

  const onLogin = (data) => {
    setLoading(true)
    login(data)
      .then((res) => {
        setToken(res.token)
        onLoadUserInfo()
        history.push('/app')
      })
      .catch((error) => {
        showError(error)
        form.resetFields()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    onLogin,
    loading,
    form
  }
}

export default LoginHook
