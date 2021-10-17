import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Row, Col, Card } from 'antd'
import { useTranslation } from 'react-i18next'
import { AppContext } from 'contexts/app.context'
import UserInfoHook from './hook'
import UserInfoProfile from 'components/UserInfoProfile'
import UpdateUser from 'components/UpdateUser'
import ChangePassword from 'components/ChangePassword'
import './styles.scss'

const UPDATE_USER_TAB = 'UPDATE_USER_TAB'
const CHANGE_PASS_TAB = 'CHANGE_PASS_TAB'

const UserInfo = () => {
  const [tabAcitve, setTabActive] = useState(UPDATE_USER_TAB)
  const { user } = useContext(AppContext)
  const { t } = useTranslation()
  const { loading, onUpdateUser, onChangePass, changing } = UserInfoHook()

  const userTabs = useMemo(() => {
    return [
      {
        key: UPDATE_USER_TAB,
        tab: t('Update user')
      },
      {
        key: CHANGE_PASS_TAB,
        tab: t('Change password')
      }
    ]
  }, [t])

  const setActiveTab = useCallback(
    (keyActive) => {
      setTabActive(keyActive)
    },
    [tabAcitve]
  )

  const componentTabs = useMemo(() => {
    return {
      UPDATE_USER_TAB: <UpdateUser loading={loading} onUpdateUser={onUpdateUser} />,
      CHANGE_PASS_TAB: <ChangePassword loading={changing} onChangePass={onChangePass} />
    }
  }, [loading, changing])

  console.log('render page UserInfo')
  return (
    <Row id="user-info-page" gutter={24} style={{ padding: 10 }}>
      <Col span={8}>
        <UserInfoProfile user={user} />
      </Col>
      <Col span={16}>
        <Card hoverable tabList={userTabs} activeTabKey={tabAcitve} onTabChange={setActiveTab}>
          {componentTabs[tabAcitve]}
        </Card>
      </Col>
    </Row>
  )
}

export default UserInfo
