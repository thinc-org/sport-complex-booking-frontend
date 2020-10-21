import React, { useState } from 'react';
import Main from './components/pages/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store/configureStore';

import ListOfAllUsers from './components/pages/ListOfAllUsers';

const store = ConfigureStore();

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {/*<Main/>*/}
                    <ListOfAllUsers />
                </div>
            </BrowserRouter>
        </Provider>

        
    )
}

export default App;