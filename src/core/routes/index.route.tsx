import React from "react"
import Switch from "react-bootstrap/esm/Switch"
import { Route } from "react-router"

export default function MainRoute() {
  return (
    <Switch>
      <Route excat path="/">
        {/* Home Page */}
      </Route>
      <Route exact path="/login">
        {/* Login Page */}
      </Route>
      <Route exact path="/register">
        {/* Register Page */}
      </Route>
      <Route exact path="/profile">
        {/* Profile Page */}
      </Route>
    </Switch>
  )
}
