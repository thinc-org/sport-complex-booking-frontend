import * as React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ListOfCourts from './list-of-courts'
const DisableCourt = () => {
    const { path, url } = useRouteMatch()
    return (
        <Switch>
            <Route path={path} component={ListOfCourts} exact />
        </Switch>
    )
}
export default DisableCourt