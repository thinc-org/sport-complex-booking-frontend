import React from "react"

import { Switch, Route, useRouteMatch } from "react-router-dom"
import ListOfCourts from "./list-of-courts"
import ViewCourt from "./viewCourt"
import AddCourt from "./addCourt"

const DisableCourt = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/add`} component={AddCourt} />
      <Route path={`${path}/:id`} component={ViewCourt} />
      <Route path={path} component={ListOfCourts} exact />
    </Switch>
  )
}
export default DisableCourt
