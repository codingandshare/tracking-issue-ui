import React from 'react'
import { Layout, Menu } from 'antd'
import { map } from 'common/func.utils'
import { useHistory } from 'react-router'
const { Header } = Layout
import './appHeader'

const AppHeader = (props) => {
  const { menus, active } = props
  const history = useHistory()

  const onNav = (menu) => {
    history.push(menu.path)
  }

  return (
    <Header id="app-header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
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
