import React from "react"
import Switch from "react-bootstrap/esm/Switch"
import { Route } from "react-router"

import ListOfAllUsers from '../../components/pages/ListOfAllUsers';
import CUInfo from "../../components/pages/CUInfo";
import AddUser from "../../components/pages/AddUser";
// import SatitInfo from "../../components/pages/SatitInfo"

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

      <Route exact path="/listOfAllUsers" component={ListOfAllUsers} />
      <Route exact path="/CUInfo/:username" component={CUInfo} />
      {/* <Route exact path="/SatitInfo/:username" component={SatitInfo} />
      <Route exact path="/UserInfo/:username" component={UserInfo} /> */}
      <Route exact path="/addUser" component={AddUser} />
    </Switch>
  )
}
