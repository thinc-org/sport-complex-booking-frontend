import React, { useContext, useState } from "react"
import OtherAaccountDisplay from "./AccountPageUI/OtherDisplay"
import OtherAccountEdit from "./AccountPageUI/OtherEdit"
import { UserContext } from "../../../contexts/UsersContext"
import EditAccount from "./AccountPageUI/EditAccount"

export default function OtherAccount() {
  const { otherAccount: user } = useContext(UserContext)
  const [isEditting, setIsEditting] = useState(false)

  const toggleEditButton = () => {
    setIsEditting(!isEditting)
  }

  return (
    <div>
      {user?.verification_status === "Submitted" || user?.verification_status === "Verified" ? (
        isEditting ? (
          <EditAccount toggleEditButton={toggleEditButton} user={user} />
        ) : (
          <OtherAaccountDisplay toggleEditButton={toggleEditButton} />
        )
      ) : (
        <OtherAccountEdit isRegister={false} />
      )}
    </div>
  )
}
