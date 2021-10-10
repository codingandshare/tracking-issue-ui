import React, { createContext } from 'react'
import UserContext from './user.context'

export const AppContext = createContext({})

export const AppProvider = (props) => {
  const user = UserContext()
  const dataApp = {
    ...user
  }
  return <AppContext.Provider value={dataApp}>{props.children}</AppContext.Provider>
}
