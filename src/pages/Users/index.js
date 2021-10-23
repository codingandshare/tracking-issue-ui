import React from 'react'
import { Row, Col, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AppTable from 'components/AppTable'
import UserHook from './hook'

const Users = () => {
  const { t, userData, onChangeTable } = UserHook()

  console.log('render user')
  return (
    <>
      <Row gutter={24}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <div style={{ padding: 20 }}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('New user')}
            </Button>
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <AppTable tableData={userData} onChangeTable={onChangeTable} />
        </Col>
      </Row>
    </>
  )
}

export default Users
