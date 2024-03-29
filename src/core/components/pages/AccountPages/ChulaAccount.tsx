import React, { useContext, useState } from "react"
import ChulaAccountDisplay from "./AccountPageUI/ChulaAccountDisplay"
import { UserContext } from "../../../contexts/UsersContext"
import EditAccount from "./AccountPageUI/EditAccount"
import { WarningMessage } from "../../ui/Modals/AccountPageModals"

export default function ChulaAccount() {
  const [isEditting, setIsEditting] = useState(false)

  const { cuStudentAccount: user } = useContext(UserContext)

  const toggleEditButton = () => {
    if (isEditting) {
      setIsEditting(false)
    } else {
      setIsEditting(true)
    }
  }

  return (
    <div>
      <div className="col-md-6 mx-auto">{user && <WarningMessage show={user.is_first_login} account={user.account_type} />}</div>
      <div className="col-md-6 mx-auto">
        {user && <WarningMessage show={!user.is_first_login} account={user.account_type} verification_status="Information" />}
      </div>
      {!isEditting ? (
        <ChulaAccountDisplay toggleEditButton={toggleEditButton} user={user} />
      ) : (
        <EditAccount toggleEditButton={toggleEditButton} user={user} />
      )}
    </div>
  )
}
