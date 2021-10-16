import React, { useContext, useState } from 'react'
import { Row, Col, Card, Divider, Form, Input, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { AppContext } from 'contexts/app.context'
import { get } from 'common/func.utils'
import UserInfoHook from './hook'
import './styles.scss'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const UPDATE_USER_TAB = 'UPDATE_USER_TAB'
const CHANGE_PASS_TAB = 'CHANGE_PASS_TAB'

const UserInfo = () => {
  const [tabAcitve, setTabActive] = useState(UPDATE_USER_TAB)
  const { user } = useContext(AppContext)
  const { t } = useTranslation()
  const { loading, onUpdateUser, onChangePass, changing, form } = UserInfoHook()

  const onReset = () => {
    form.resetFields()
  }

  const userTabs = [
    {
      key: UPDATE_USER_TAB,
      tab: t('Update user')
    },
    {
      key: CHANGE_PASS_TAB,
      tab: t('Change password')
    }
  ]

  const renderUpdateUser = () => {
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

  const renderChangePassword = () => {
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
              <Button loading={changing} type="primary" htmlType="submit">
                {t('Change password')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }

  const componentTabs = {
    UPDATE_USER_TAB: renderUpdateUser(),
    CHANGE_PASS_TAB: renderChangePassword()
  }

  return (
    <Row id="user-info-page" gutter={24} style={{ padding: 10 }}>
      <Col span={8}>
        <Card loading={loading} hoverable title={t('User Info')}>
          <div className="row-info">
            <strong className="label-col">{'Username'}</strong>
            <span>{get(user, 'username', 'N/A')}</span>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div className="row-info">
            <strong className="label-col">{'Email'}</strong>
            <span>{get(user, 'email', 'N/A')}</span>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div className="row-info">
            <strong className="label-col">{'Fullname'}</strong>
            <span>{`${get(user, 'firstName', '')} ${get(user, 'lastName', '')}`}</span>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div className="row-info">
            <strong className="label-col">{'Gender'}</strong>
            <span>{user.gender === 0 ? t('Male') : t('Female')}</span>
          </div>
        </Card>
      </Col>
      <Col span={16}>
        <Card hoverable tabList={userTabs} activeTabKey={tabAcitve} onTabChange={setTabActive}>
          {componentTabs[tabAcitve]}
        </Card>
      </Col>
    </Row>
  )
}

export default UserInfo
