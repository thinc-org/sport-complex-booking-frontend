import React from "react"
import { useState} from "react"
import OtherAaccountDisplay from "./AccountPageUI/OtherDisplay"
import OtherAccountEdit from "./AccountPageUI/OtherEdit"
import { UserContext } from "../../../contexts/UsersContext"
import NavigationBar from "../../ui/navbar/navbar"

export default function OtherAccount({ jwt }) {
  /// Page states
  let [is_editting, set_is_editting] = useState(false)

  return (
    <UserContext.Consumer>
      {(context) => {
        const { Other } = context
        const user = Other

        const toggleEditButton = () => {
          if (is_editting) {
            set_is_editting(false)
          } else {
            set_is_editting(true)
          }
        }

        /// JSX Begins here
        return (
          <div>
            {
              user.verification_status === "Submitted" || user.verification_status === "Approved" ? (
                <OtherAaccountDisplay jwt={jwt} toggle_edit_button={toggleEditButton} />
              ) : (
                <OtherAccountEdit jwt={jwt} toggle_edit_button={toggleEditButton} />
              )
            }
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}
