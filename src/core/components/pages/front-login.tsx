import * as React from "react"
import { useState, useEffect, useContext } from "react"
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FrontLoginMain from '../ui/login/login-main'
import Footer from '../ui/footer/footer'
import PersonalInfo from '../ui/login/personal-info-form';
import { NavHeader } from '../../routes/index.route'
const FrontLoginPage = (props: any) => {
  let { url, path } = useRouteMatch()
  let { head, setHead } = useContext(NavHeader)
  return (
    <>
      <Switch>
        <Route path={`${path}/personal`} render={() => {
          setHead('Tell us about yourself')
          return <PersonalInfo />
        }} />
        <Route exact path={path} render={() => {
          setHead('CU Sports Center')
          return <FrontLoginMain />
        }} />
      </Switch>
      <Footer />
    </>
  )
}
export default FrontLoginPage;
