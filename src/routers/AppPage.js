import React, { useContext, Suspense, useEffect, useCallback } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout, Breadcrumb } from 'antd'
import { AppContext } from 'contexts/app.context'
import AppHeader from 'components/AppHeader'
import { useLocation } from 'react-router'
import { findIndex, map, filter } from 'common/func.utils'
import { URL_PERMISSIONS } from 'common/role.const'
import VersionModal from 'components/VersionModal'
const { Content, Footer } = Layout

const AppPage = () => {
  const { t } = useTranslation()
  const {
    user,
    isSignIned,
    isShowVersionModal,
    versions,
    setIsShowVersionModal,
    onSelectVersion,
    version,
    loadVersionModal
  } = useContext(AppContext)
  const role = 'ROLE_ADMIN'
  const location = useLocation()
  const routers = URL_PERMISSIONS[role]
  const menus = filter(routers, (it) => it.name)
  const activeIndex = findIndex(routers, (it) => it.path === location.pathname)
  const activeMenu = activeIndex >= 0 ? routers[activeIndex] : null

  useEffect(() => {
    if (isSignIned) {
      loadVersionModal()
    }
  }, [isSignIned])

  const onCloseModalVersion = useCallback(() => {
    setIsShowVersionModal(false)
  }, [])

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
              {routers &&
                map(routers, (it, index) => {
                  return <Route path={it.path} component={it.component} key={index} />
                })}
            </Switch>
          </Suspense>
        </div>
      </Content>
      <VersionModal
        isShow={isShowVersionModal}
        versions={versions}
        onSelect={onSelectVersion}
        version={version}
        onClose={onCloseModalVersion}
      />
      <Footer style={{ textAlign: 'center' }}>Tracking Issues ©2021 Created by codingandshare</Footer>
    </Layout>
  )
}

export default AppPage
