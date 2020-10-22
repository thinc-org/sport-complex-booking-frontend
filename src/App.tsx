import React, { useState } from 'react';
import Main from './components/pages/MainComponent';
import './App.css';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store/configureStore';

import ListOfAllUsers from './components/pages/ListOfAllUsers';

import FrontLogin from './components/pages/front-login';
import NavigationBar from './components/ui/navbar';
const store = ConfigureStore();

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavigationBar/>
                <Switch>
                    <Route path="/login">
                        <FrontLogin/>
                    </Route>
                    <Route path="/">
                        <div>
                            <Main/>
                        </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>

        
    )
}

export default App;