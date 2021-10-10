import React from 'react'
import AppRouter from 'routers/AppRouter'
import { AppProvider } from './contexts/app.context'

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
