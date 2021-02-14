import React, { ComponentType, FC } from "react"
import { Redirect } from "react-router"
import { useAuthContext } from "../controllers/authContext"

function withAdminGuard<P>(Component: ComponentType<P>): FC<P> {
  return function WithAdminGuard(props: P) {
    const { role } = useAuthContext()
    if (role !== "Admin") {
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
