import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

const theme = createTheme({
  palette:{
    primary: {
      main: '#3f51b5', // Purple and Green gradient
    },
    secondary: {
      main: '#ffa726', // #ffc400 orange
    },
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider  theme={theme}>
  <CssBaseline/>
  <Provider store={store}>
    <App />
  </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
