import React, { useState } from "react"
import SportsSettings from "./SportsSettings"
import CourtsSettings from "./CourtsSettings"
import TimeSettings from "./TimeSettings"
import { ToggleButton, ButtonGroup } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css"

export default function Settings() {
  const [radioValue, setRadioValue] = useState("กีฬา")

  const radios = [
    { name: "กีฬา", value: "กีฬา" },
    { name: "คอร์ด", value: "คอร์ด" },
    { name: "เวลา", value: "เวลา" },
  ]

  const showSettingsPage = (radioValue: string) => {
    switch (radioValue) {
      case "กีฬา":
        return <SportsSettings />
      case "คอร์ด":
        return <CourtsSettings />
      case "เวลา":
        return <TimeSettings />
    }
  }

  return (
    <div className="allStaff" style={{ margin: "20px" }}>
      <ButtonGroup toggle className="mb-3">
        {radios.map((radio, idx) => (
          <ToggleButton
            className="mr-4 btn-outline-dark"
            key={radio.value + idx}
            type="radio"
            variant="black"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      {showSettingsPage(radioValue)}
    </div>
  )
}
