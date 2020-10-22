import React, { useState } from "react"
import Main from "./components/pages/MainComponent"
import "./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore } from "./core/redux/configureStore"
import FrontLogin from "./components/pages/front-login"
import NavigationBar from "./components/ui/navbar"

// MIGRATE TO src/core/modules/app.module.tsx

const store = configureStore()

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavigationBar />
                <Switch>
                    <Route path="/login">
                        <FrontLogin />
                    </Route>
                    <Route path="/">
                        <div>
                            <Main />
                        </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App
