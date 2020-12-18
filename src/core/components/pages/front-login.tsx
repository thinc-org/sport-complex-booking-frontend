import * as React from "react"
import { useEffect, useContext } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { getCookie } from '../../contexts/cookieHandler'
import FrontLoginMain from '../ui/login/login-main'
import Footer from '../ui/footer/footer'
import { useAuthContext } from '../../controllers/authContext'
import PersonalInfo from '../ui/login/personal-info-form';
const FrontLoginPage = (props: any) => {
  const { url, path } = useRouteMatch()
  const prevent = usePreventUserFromSignIn()
  return (
    <>
      <Switch>
        <Route path={`${path}/sso`} component={() => {
          window.location.href = 'https://account.it.chula.ac.th/html/login.html?service=http://localhost:3001/login';
          return null
        }}
        />
        <Route path={`${path}/personal`} component={PersonalInfo} />
        <Route exact path={path} component={FrontLoginMain} />
      </Switch>
      <Footer />
    </>
  )
}

const usePreventUserFromSignIn = () => {
  const history = useHistory()
  const { isUser } = useAuthContext()
  useEffect(() => {
    if (isUser) history.push('/account')
  }, [])
}
export default FrontLoginPage; 
