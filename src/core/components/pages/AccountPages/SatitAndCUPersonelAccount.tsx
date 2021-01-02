import SatitAndCUPersonelAccountDisplay from "./AccountPageUI/SatitAndCUPersonelAccountDisplay"
import SatitAndCUPersonelAccountEdit from "./AccountPageUI/SatitAndCUPersonelAccountEdit"
import React, { useState } from "react"

export default function SatitAndCuPersonel() {
  const [isEditting, setIsEditting] = useState(false)

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
        <SatitAndCUPersonelAccountDisplay toggleEditButton={toggleEditButton} />
      ) : (
        <SatitAndCUPersonelAccountEdit toggleEditButton={toggleEditButton} />
      )}
    </div>
  )
}
