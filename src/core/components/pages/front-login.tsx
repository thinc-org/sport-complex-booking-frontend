import * as React from "react"
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FrontLoginMain from '../ui/login/login-main'
import Footer from '../ui/footer/footer'
import PersonalInfo from '../ui/login/personal-info-form';
const FrontLoginPage = (props: any) => {
  let { url, path } = useRouteMatch()
  return (
    <>
      <Switch>
<<<<<<< HEAD
        <Route path={`${path}/personal`} component={PersonalInfo} />
        <Route exact path={path} component={FrontLoginMain} />
=======
        <Route path={`${path}/personal`} render={() => {
          return (
            <PersonalInfo />
          )
        }} />
        <Route exact path={path} render={() => {
          return <FrontLoginMain />
        }} />
>>>>>>> a1671ec... fixed front navbar and staff navbar both show up, remove navheader Context
      </Switch>
      <Footer />
    </>
  )
}
export default FrontLoginPage;
