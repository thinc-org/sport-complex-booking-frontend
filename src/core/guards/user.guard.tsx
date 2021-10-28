import React, { ComponentType, FC } from "react"
import { Redirect } from "react-router"
import { getCookie } from "../contexts/cookieHandler"
import { useAuthContext } from "../controllers/authContext"

function withUserGuard<P>(Component: ComponentType<P>): FC<P> {
  return function WithUserGuard(props: P) {
    const { isUser, role } = useAuthContext()
    if (isUser && (role !== "User" || getCookie("token") === undefined)) {
      return <Redirect to="/login" />
    } else {
      return <Component {...props} />
    }
  }
}

export default withUserGuard
