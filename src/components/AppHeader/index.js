import React, { useContext } from 'react'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import { LogoutOutlined, UserOutlined, BranchesOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { AppContext } from 'contexts/app.context'
import { map, get } from 'common/func.utils'
import { useHistory } from 'react-router'
const { Header } = Layout
import './appHeader'

const AppHeader = (props) => {
  const { menus, active } = props
  const history = useHistory()
  const { t } = useTranslation()
  const { user, onLogout, showVersionModal } = useContext(AppContext)

  const onNav = (menu) => {
    history.push(menu.path)
  }

  const onUserInfo = () => {
    history.push('/app/user-info')
  }

  const onUserLoginOut = () => {
    onLogout()
    history.push('/authen')
  }

  const menu = (
    <Menu>
      <Menu.Item icon={React.createElement(UserOutlined)} key="0" onClick={onUserInfo}>
        {t('User Info')}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={React.createElement(BranchesOutlined)} key="1" onClick={showVersionModal}>
        {t('Select version')}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={React.createElement(LogoutOutlined)} key="2" onClick={onUserLoginOut}>
        {t('Logout')}
      </Menu.Item>
    </Menu>
  )

  const getShortName = () => {
    if (user) {
      if (get(user, 'firstName', null)) {
        return `${get(user, 'firstName')[0]} ${get(user, 'lastName', 'O')[0]}`
      } else {
        return get(user, 'username', 'Unknown')
      }
    } else {
      return 'Unknown'
    }
  }

  return (
    <Header id="app-header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
        <Avatar color={'#7265e6'} className="app-avatar" size="large">
          {getShortName()}
        </Avatar>
      </Dropdown>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${active}`]} selectedKeys={[`${active}`]}>
        {map(menus, (it, index) => {
          return (
            <Menu.Item onClick={() => onNav(it)} key={`${index}`}>
              {it.name}
            </Menu.Item>
          )
        })}
      </Menu>
    </Header>
  )
}

export default AppHeader
