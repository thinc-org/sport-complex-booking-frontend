import React, { useState } from "react"
import Main from "./core/components/pages/MainComponent"
import "./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore } from "./core/redux/configureStore"
import FrontLogin from "./core//components/pages/front-login"
import NavigationBar from "./core/components/ui/navbar/navbar"

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
