import * as React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ListOfCourts from './list-of-courts'
import ViewCourt from './viewCourt'
const DisableCourt = () => {
    const { path, url } = useRouteMatch()
    return (
        <Switch>
            <Route path={`${path}/:id`} component={ViewCourt} />
            <Route path={`${path}/add`} component={ViewCourt} />
            <Route path={path} component={ListOfCourts} exact />
        </Switch>
    )
}
export default DisableCourt