import React, { useContext } from "react"
import OtherAaccountDisplay from "./AccountPageUI/OtherDisplay"
import OtherAccountEdit from "./AccountPageUI/OtherEdit"
import { UserContext } from "../../../contexts/UsersContext"

export default function OtherAccount() {
  const { otherAccount: user } = useContext(UserContext)
  return (
    <div>
      {user?.verification_status === "Submitted" || user?.verification_status === "Verified" ? <OtherAaccountDisplay /> : <OtherAccountEdit />}
    </div>
  )
}
