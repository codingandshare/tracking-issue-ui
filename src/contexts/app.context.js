import React, { createContext } from 'react'
import UserContext from './user.context'
import VersionContext from './version.context'

export const AppContext = createContext({})

export const AppProvider = (props) => {
  const user = UserContext()
  const version = VersionContext()
  const dataApp = {
    ...user,
    ...version
  }
  return <AppContext.Provider value={dataApp}>{props.children}</AppContext.Provider>
}
