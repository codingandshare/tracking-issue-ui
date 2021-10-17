import React from 'react'
import { Row, Col, Form, Input, Select, Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const UpdateUser = ({ onUpdateUser, loading }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const onReset = () => {
    form.resetFields()
  }
  console.log('render UpdateUser')
  return (
    <Row>
      <Col span={2} />
      <Col span={16}>
        <Form {...layout} form={form} name="updateUser" onFinish={onUpdateUser}>
          <Form.Item
            hasFeedback
            name="firstName"
            label={t('Firstname')}
            rules={[{ required: true, message: t('Please enter firstName') }]}
          >
            <Input size={'large'} />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="lastName"
            label={t('Lastname')}
            rules={[{ required: true, message: t('Please enter lastName') }]}
          >
            <Input size={'large'} />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="email"
            label={t('Email')}
            rules={[
              { required: true, message: t('Please enter the email') },
              {
                type: 'email',
                message: t('The input is not valid E-mail')
              }
            ]}
          >
            <Input size={'large'} />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="gender"
            label={t('Gender')}
            rules={[{ required: true, message: t('Please enter gender') }]}
          >
            <Select size={'large'}>
              <Select.Option value={0}>{t('Male')}</Select.Option>
              <Select.Option value={1}>{t('Female')}</Select.Option>
            </Select>
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
              {t('Update')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default React.memo(UpdateUser)
