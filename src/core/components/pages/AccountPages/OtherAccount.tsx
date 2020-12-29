import React from "react"
import OtherAaccountDisplay from "./AccountPageUI/OtherDisplay"
import OtherAccountEdit from "./AccountPageUI/OtherEdit"
import { UserContext } from "../../../contexts/UsersContext"

export default function OtherAccount() {

  return (
    <UserContext.Consumer>
      {(context) => {
        const { otherAccount: user } = context

        /// JSX Begins here
        return (
          <div>
            {
              user?.verification_status === "Submitted" || user?.verification_status === "Verified" ? (
                <OtherAaccountDisplay/>
              ) : (
                <OtherAccountEdit/>
              )
            }
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}
