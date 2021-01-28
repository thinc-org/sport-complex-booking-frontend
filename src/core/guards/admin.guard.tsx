import React, { ComponentType, FC } from "react"
import { Redirect } from "react-router"
import { useAuthContext } from "../controllers/authContext"

function withAdminGuard<P>(Component: ComponentType<P>): FC<P> {
  return function WithAdminGuard(props: P) {
    const { isAdmin } = useAuthContext()
    if (!isAdmin) {
      return (
        <Redirect
          to={{
            pathname: "/staff/profile",
            search: "",
            state: {
              invalidAccess: true,
            },
          }}
        />
      )
    } else {
      return <Component {...props} />
    }
  }
}

export default withAdminGuard
