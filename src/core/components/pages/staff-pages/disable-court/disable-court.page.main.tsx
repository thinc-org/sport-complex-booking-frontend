import * as React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ListOfCourts from './list-of-courts'
import ViewCourt from './viewCourt'
import AddCourt from './addCourt'
import EditCourt from './editCourt'
const DisableCourt = () => {
    const { path, url } = useRouteMatch()
    return (
        <Switch>
            <Route path={`${path}/add`} component={AddCourt} />
            <Route path={`${path}/edit`} component={EditCourt} />
            <Route path={`${path}/:id`} component={ViewCourt} />
            <Route path={path} component={ListOfCourts} exact />
        </Switch>
    )
}
export default DisableCourt