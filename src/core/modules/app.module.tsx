import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import UserContextProvider from "../contexts/UsersContext"
import { configureStore } from "../redux/configureStore"
import MainRoute from "../routes/index.route"
import AuthProvider from "../controllers/authContext"
const store = configureStore()

export default function AppModule() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserContextProvider>
          <BrowserRouter>
            <MainRoute />
          </BrowserRouter>
        </UserContextProvider>
      </AuthProvider>
    </Provider>
  )
}
