import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, GlobalStyles } from '@mui/material'
import App from './App.jsx'
// cấu hình toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// cấu hình react-router-dom với broswer router
import { BrowserRouter } from 'react-router-dom'
//Cấu hình Mui dialog
import { ConfirmProvider } from 'material-ui-confirm'
//redux
// import { store } from '~/redux/store'
// import { Provider } from 'react-redux'
// kỹ thuật injectStore xử dụng redux ngoài component
// import persistStore from 'redux-persist/es/persistStore'
// import { PersistGate } from 'redux-persist/integration/react'
// import { injectStore } from './utils/authorizeAxios'
import theme from './theme.js'
// injectStore(store)
// const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    {/* <Provider store={store}>
      <PersistGate persistor={persistor}> */}
    <ThemeProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        dialogProps: { maxWidth:'xs' },
        confirmationButtonProps: { color: 'error', variant: 'outlined' },
        cancellationButtonProps: { color: 'inherit' },
        allowClose: false
      }}
      >
        <GlobalStyles styles={{ a: { textDecoration: 'none' } }}/>

        <CssBaseline />
        <App />
        {/* <SmoothCursor /> */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </ConfirmProvider>
    </ThemeProvider>
    {/* </PersistGate>
    </Provider> */}
  </BrowserRouter>
)
