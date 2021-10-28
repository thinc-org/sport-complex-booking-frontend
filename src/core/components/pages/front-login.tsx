import React from "react"

import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom"
import { useAuthContext } from "../../controllers/authContext"
import FrontLoginMain from "../ui/login/login-main"
import PersonalInfo from "../ui/login/personal-info-form"

const FrontLoginPage = () => {
  const { path } = useRouteMatch()
  const { isUser, role } = useAuthContext()
  return (
    <>
      {isUser && role === "User" && <Redirect to="/home" />}
      <Switch>
        <Route path={`${path}/personal`} component={PersonalInfo} />
        <Route exact path={path} component={FrontLoginMain} />
      </Switch>
    </>
  )
}

export default FrontLoginPage
