import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import ThemeContextProvider from "../contexts/UsersContext"
import { configureStore } from "../redux/configureStore"
import MainRoute from "../routes/index.route"
import AuthProvider from '../controllers/auth.controller'
const store = configureStore()


export default function AppModule() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <MainRoute />
          </BrowserRouter>
        </ThemeContextProvider>
      </AuthProvider>
    </Provider>
  )
}
