import * as React from "react"
import { useState, useEffect, useContext } from "react"
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FrontLoginMain from '../ui/login/login-main'
import Footer from '../ui/footer/footer'
import PersonalInfo from '../ui/login/personal-info-form';
const FrontLoginPage = (props: any) => {
  let { url, path } = useRouteMatch()
  return (
    <>
      <Switch>
        <Route path={`${path}/personal`} render={() => {
          return (
            <PersonalInfo />
          )
        }} />
        <Route exact path={path} render={() => {
          return <FrontLoginMain />
        }} />
      </Switch>
      <Footer />
    </>
  )
}
export default FrontLoginPage;
