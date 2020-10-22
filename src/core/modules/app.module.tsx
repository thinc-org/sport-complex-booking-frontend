import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { configureStore } from "../redux/configureStore"
import MainRoute from "../routes/index.route"

const store = configureStore()

export default function AppModule() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </Provider>
  )
}
