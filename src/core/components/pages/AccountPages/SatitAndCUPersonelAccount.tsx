import React, { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UsersContext"
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
      {!isEditting ? (
        <SatitAndCUPersonelAccountDisplay toggleEditButton={toggleEditButton} user={user} />
      ) : (
        <EditAccount toggleEditButton={toggleEditButton} user={user} />
      )}
    </div>
  )
}
