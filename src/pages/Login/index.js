import React from 'react'
import { Row, Col, Card, Form, Input, Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import LoginHook from './hook'
import './login'

const Login = () => {
  const { t } = useTranslation()
  const { onLogin, loading, form } = LoginHook()

  return (
    <div id="login-page">
      <Row gutter={24}>
        <Col span={24}>
          <Card hoverable title={t('Login to Tracking Issues')}>
            <Form name="loginForm" autoComplete="off" layout="vertical" onFinish={onLogin} form={form}>
              <Form.Item
                label={t('Username')}
                name="username"
                rules={[{ required: true, message: `${t('Please input your username')}!` }]}
              >
                <Input placeholder={t('Please enter a username')} size={'large'} />
              </Form.Item>
              <Form.Item
                label={t('Password')}
                name="password"
                rules={[{ required: true, message: `${t('Please input your password')}!` }]}
              >
                <Input.Password placeholder={t('Please enter a password')} size={'large'} />
              </Form.Item>
              <Divider />
              <Form.Item>
                <Button block size={'large'} loading={loading} htmlType={'submit'} type="primary">
                  {t('Login')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Login
