import React from "react"
import { useState } from "react"

import ChulaAccountEdit from "./AccountPageUI/ChulaAccountEdit"
import ChulaAccountDisplay from "./AccountPageUI/ChulaAccountDisplay"

export default function ChulaAccount() {
  let [is_editting, set_is_editting] = useState(false)

  const toggleEditButton = () => {
    if (is_editting) {
      set_is_editting(false)
    } else {
      set_is_editting(true)
    }
  }

  return (
    <div>
      {!is_editting ? <ChulaAccountDisplay toggle_edit_button={toggleEditButton} /> : <ChulaAccountEdit toggle_edit_button={toggleEditButton} />}
    </div>
  )
}
