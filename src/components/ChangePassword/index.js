import React from 'react'
import { Row, Col, Form, Input, Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const ChangePassword = ({ onChangePass, loading }) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  const onReset = () => {
    form.resetFields()
  }

  console.log('render ChangePassword')
  return (
    <Row>
      <Col span={2} />
      <Col span={16}>
        <Form {...layout} form={form} name="changePassword" onFinish={onChangePass}>
          <Form.Item
            hasFeedback
            name="oldPassword"
            label={t('Old password')}
            rules={[{ required: true, message: t('Please enter dld password') }]}
          >
            <Input.Password size={'large'} />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="newPassword"
            label={t('New password')}
            rules={[{ required: true, message: t('Please enter new password') }]}
          >
            <Input.Password size={'large'} />
          </Form.Item>
          <Form.Item
            name="reNewPassword"
            label={t('Confirm new password')}
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: t('Please confirm your password')
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('The two passwords that you entered do not match')))
                }
              })
            ]}
          >
            <Input.Password size={'large'} />
          </Form.Item>
          <Divider />
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 8 },
              sm: { span: 24, offset: 8 }
            }}
          >
            <Button style={{ marginRight: 10 }} onClick={onReset}>
              {t('Reset')}
            </Button>
            <Button loading={loading} type="primary" htmlType="submit">
              {t('Change password')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default React.memo(ChangePassword)
