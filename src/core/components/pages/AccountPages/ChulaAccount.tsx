import React from "react"
import { useState } from "react"

import ChulaAccountEdit from "./AccountPageUI/ChulaAccountEdit"
import ChulaAccountDisplay from "./AccountPageUI/ChulaAccountDisplay"

export default function ChulaAccount() {
  const [isEditting, setIsEditting] = useState(false)

  const toggleEditButton = () => {
    if (isEditting) {
      setIsEditting(false)
    } else {
      setIsEditting(true)
    }
  }

  return (
    <div>{!isEditting ? <ChulaAccountDisplay toggleEditButton={toggleEditButton} /> : <ChulaAccountEdit toggleEditButton={toggleEditButton} />}</div>
  )
}
