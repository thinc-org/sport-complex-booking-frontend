import React, { ComponentType, FC } from "react"
import { Redirect } from "react-router"
import { useAuthContext } from "../controllers/authContext"

function withAdminGuard<P>(Component: ComponentType<P>): FC<P> {
  return function WithAdminGuard(props: P) {
    const { isAdmin } = useAuthContext()
    if (!isAdmin) {
      return <Redirect to="/login" />
    } else {
      return <Component {...props} />
    }
  }
}

export default withAdminGuard
