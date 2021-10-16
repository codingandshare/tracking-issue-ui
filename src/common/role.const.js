import { lazy } from 'react'
const Tracking = lazy(() => import('pages/Tracking'))
const Users = lazy(() => import('pages/Users'))
const UserInfo = lazy(() => import('pages/UserInfo'))

export const ROLE_USER = 'ROLE_USER'
export const ROLE_ADMIN = 'ROLE_ADMIN'

export const URL_PERMISSIONS = {
  ROLE_USER: [
    {
      path: '/app/tracking',
      component: Tracking,
      name: 'Tracking',
      breadcrumbs: ['Home', 'Tracking']
    },
    {
      path: '/app/user-info',
      component: UserInfo
    }
  ],
  ROLE_ADMIN: [
    {
      path: '/app/tracking',
      component: Tracking,
      name: 'Tracking',
      breadcrumbs: ['Home', 'Tracking']
    },
    {
      path: '/app/users',
      component: Users,
      name: 'Users',
      breadcrumbs: ['Home', 'Users']
    },
    {
      path: '/app/user-info',
      component: UserInfo,
      breadcrumbs: ['Home', 'Personal profile']
    }
  ]
}
