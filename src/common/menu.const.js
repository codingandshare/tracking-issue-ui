import { filter, findIndex } from 'common/func.utils'

const menus = [
  {
    name: 'Tracking',
    path: '/app/tracking',
    breadcrumbs: ['Home', 'Tracking'],
    roles: ['ROLE_ADMIN', 'ROLE_USER']
  },
  {
    name: 'Users',
    path: '/app/users',
    breadcrumbs: ['Home', 'Users'],
    roles: ['ROLE_ADMIN']
  }
]

const getMenusFromRole = (roles) => {
  return filter(menus, (menu) => {
    const inx = findIndex(menu.roles, (role) => {
      return roles.includes(roles)
    })
    return inx >= 0
  })
}

export default getMenusFromRole
