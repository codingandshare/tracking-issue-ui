import React, { useMemo } from 'react'
import { Card, Divider } from 'antd'
import { get } from 'common/func.utils'
import { useTranslation } from 'react-i18next'

const UserInfoProfile = (props) => {
  const { user } = props
  const { t } = useTranslation()

  const fullName = useMemo(() => {
    return `${get(user, 'firstName', '')} ${get(user, 'lastName', '')}`
  }, [user.firstName, user.lastName])

  const genderText = useMemo(() => {
    return user.gender === 0 ? t('Male') : t('Female')
  }, [user.gender])

  console.log('user UserInfoProfile')

  return (
    <Card hoverable title={t('User Info')}>
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
        <span>{fullName}</span>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className="row-info">
        <strong className="label-col">{'Gender'}</strong>
        <span>{genderText}</span>
      </div>
    </Card>
  )
}

export default React.memo(UserInfoProfile)
