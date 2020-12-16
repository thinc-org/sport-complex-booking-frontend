import SatitAndCUPersonelAccountDisplay from "./AccountPageUI/SatitAndCUPersonelAccountDisplay"
import SatitAndCUPersonelAccountEdit from "./AccountPageUI/SatitAndCUPersonelAccountEdit"
import React from "react"
import { useState } from "react"
import NavigationBar from "../../ui/navbar/navbar"

export default function SatitAndCuPersonel() {
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
      {
        !is_editting ? (
          <SatitAndCUPersonelAccountDisplay toggle_edit_button={toggleEditButton} />
        ) : (
          <SatitAndCUPersonelAccountEdit toggle_edit_button={toggleEditButton} />
        )
      }
    </div>
  )
}
