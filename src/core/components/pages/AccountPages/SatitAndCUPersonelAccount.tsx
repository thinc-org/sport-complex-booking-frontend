import React, { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UsersContext"
import { RegisterSatit } from "../../ui/login/registerSatit"
import EditAccount from "./AccountPageUI/EditAccount"
import SatitAndCUPersonelAccountDisplay from "./AccountPageUI/SatitAndCUPersonelAccountDisplay"

export default function SatitAndCuPersonel() {
  const [isEditting, setIsEditting] = useState(false)

  const { satitCuPersonelAccount: user } = useContext(UserContext)

  const toggleEditButton = () => {
    if (isEditting) {
      setIsEditting(false)
    } else {
      setIsEditting(true)
    }
  }

  return (
    <div>
      {user?.verification_status === "Submitted" || user?.verification_status === "Verified" ? (
        !isEditting ? (
          <SatitAndCUPersonelAccountDisplay toggleEditButton={toggleEditButton} user={user} />
        ) : (
          <EditAccount toggleEditButton={toggleEditButton} user={user} />
        )
      ) : (
        <RegisterSatit user={user} />
      )}
    </div>
  )
}
