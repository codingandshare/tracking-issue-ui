import React, { useContext, Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout, Breadcrumb } from 'antd'
import getMenusFromRole from 'common/menu.const'
import { AppContext } from 'contexts/app.context'
import AppHeader from 'components/AppHeader'
import { useLocation } from 'react-router'
import { find, findIndex, map } from 'common/func.utils'
const Tracking = lazy(() => import('pages/Tracking'))
const Users = lazy(() => import('pages/Users'))
const { Content, Footer } = Layout

const AppPage = () => {
  const { t } = useTranslation()
  const { user } = useContext(AppContext)
  const location = useLocation()
  const menus = getMenusFromRole('ROLE_ADMIN')
  const activeIndex = findIndex(menus, (it) => it.path === location.pathname)
  const activeMenu = menus[activeIndex]

  return (
    <Layout>
      <AppHeader menus={menus} active={activeIndex} />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        {activeMenu && (
          <Breadcrumb style={{ margin: '16px 0' }}>
            {map(activeMenu.breadcrumbs, (it, index) => {
              return <Breadcrumb.Item key={index}>{it}</Breadcrumb.Item>
            })}
          </Breadcrumb>
        )}
        <div style={{ backgroundColor: '#fff', minHeight: '80vh' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                exact
                path="/app"
                render={() => {
                  return <Redirect to="/app/tracking" />
                }}
              />
              <Route path="/app/tracking" component={Tracking} />
              <Route path="/app/users" component={Users} />
            </Switch>
          </Suspense>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tracking Issues ©2021 Created by codingandshare</Footer>
    </Layout>
  )
}

export default AppPage
