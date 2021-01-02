import React from "react"
import { useEffect, useContext } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { getCookie } from '../../contexts/cookieHandler'
import FrontLoginMain from '../ui/login/login-main'
import Footer from '../ui/footer/footer'
import { useAuthContext } from '../../controllers/authContext'
import PersonalInfo from '../ui/login/personal-info-form';
const FrontLoginPage = (props: any) => {
  const { url, path } = useRouteMatch()
  return (
    <>
      <Switch>
        <Route path={`${path}/personal`} component={PersonalInfo} />
        <Route exact path={path} component={FrontLoginMain} />
      </Switch>
    </>
  )
}


export default FrontLoginPage; 
