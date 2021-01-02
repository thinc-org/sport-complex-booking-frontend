import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import FrontLoginMain from "../ui/login/login-main"
import PersonalInfo from "../ui/login/personal-info-form"

const FrontLoginPage = () => {
  const { path } = useRouteMatch()
  return (
    <>
      <Switch>
        <Route path={`${path}/personal`} component={PersonalInfo} />
        <Route exact path={path} component={FrontLoginMain} />
      </Switch>
    </>
  )
}

export default FrontLoginPage
