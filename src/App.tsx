import React, { useEffect } from "react"
import "./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore } from "./core/redux/configureStore"
import FrontLogin from "./core//components/pages/front-login"
import NavigationBar from "./core/components/ui/navbar/navbar"
import { I18nextProvider } from 'react-i18next';
import i18n from './core/i18n/i18n';

// MIGRATE TO src/core/modules/app.module.tsx

const store = configureStore()

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/login">
            <FrontLogin />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
    </I18nextProvider>
    
  )
}

export default App
