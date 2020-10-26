import * as React from "react";
import { useState, useEffect } from 'react';
import Switch from "react-bootstrap/esm/Switch"
import { Route } from "react-router"
import FrontLoginPage from '../components/pages/front-login'
import Landing from '../components/pages/LandingComponent'
import { Sidebar } from '../components/ui/navbar/navbar'
export default function MainRoute() {
  let [navHead, setNavHead] = useState('CU Sports Center')
  const val = { head: navHead, setHead: setNavHead }
  return (
    <NavHeader.Provider value={val}>
      <Sidebar />
      <Switch>
        <Route exact path="/" render={() => {
          setNavHead('CU Sports Center')
          return <Landing />
        }} />

        <Route path="/login" render={() => {
          setNavHead('CU Sports Center')
          return <FrontLoginPage />
        }} />
        <Route exact path="/register" render={() => {
          setNavHead('CU Sports Center')
          return <div>Under maintenance</div>
        }} />

        <Route exact path="/profile" render={() => {
          setNavHead('CU Sports Center')
          return <div>Under maintenance</div>
        }} />

      </Switch>
    </NavHeader.Provider>
  )
}
interface NavHeadContext {
  head: String,
  setHead: any
}
export const NavHeader = React.createContext({} as NavHeadContext)
