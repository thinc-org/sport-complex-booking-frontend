import React, { ComponentType, FC } from "react"
import { Redirect } from "react-router"
import { useAuthContext } from "../controllers/authContext"

function withUserGuard<P>(Component: ComponentType<P>): FC<P> {
  return function WithUserGuard(props: P) {
    const { isUser } = useAuthContext()
    if (!isUser) {
      return <Redirect to="/login" />
    } else {
      return <Component {...props} />
    }
  }
}

export default withUserGuard
