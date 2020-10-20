import React from 'react';
import Header from '../ui/HeaderComponent';
import Landing from './LandingComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

function Main() {
    const LandingPage = () => {
        return(
            <Landing />
        )
    }

    return (
        <div>
            <Header/>
            <TransitionGroup>
                <Switch>
                    <Route path='/Landing' component={LandingPage} />
                    <Redirect to='/Landing' />
                </Switch>
            </TransitionGroup>
        </div>
    );
}

export default Main