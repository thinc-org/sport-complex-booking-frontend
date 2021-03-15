import { startOfDay } from "date-fns/esm"
import React from "react"
import { CountdownRenderProps } from "react-countdown"

// export const timeConversion = (input: number) => {
//   let start = ""
//   let end = ""
//   let timeFormat = ""

//   if (input < 10) {
//     start = "0" + (input - 1) + ":00"
//     end = "0" + input + ":00"
//   } else if (input === 10) {
//     start = "0" + (input - 1) + ":00"
//     end = input + ":00"
//   } else if (input > 10) {
//     start = input - 1 + ":00"
//     end = input + ":00"
//   }

//   timeFormat = start + "-" + end + " "

//   return timeFormat
// }

export const timeConversion = (input: Array<number>) => {
  const firstArray = input[0]
  const lastArray = input[input.length - 1]
  let start = ""
  let end = ""
  let timeFormat = ""

  if (firstArray < 10) {
    start = "0" + (firstArray - 1) + ":00"
  } else if (firstArray === 10) {
    start = "0" + (firstArray - 1) + ":00"
  } else if (firstArray > 10) {
    start = firstArray - 1 + ":00"
  }

  if (lastArray < 10) {
    end = "0" + lastArray + ":00"
  } else if (lastArray === 10) {
    end = lastArray + ":00"
  } else if (lastArray > 10) {
    end = lastArray + ":00"
  }

  timeFormat = start + "-" + end
  return timeFormat
}

export const timeShift = (time: number, shiftedHours: number) => {
  shiftedHours = shiftedHours * 60 * 60 * 1000
  return time + shiftedHours
}

interface TimeRemainingDisplayProps extends CountdownRenderProps {
  onTimeOut: () => void
}
export const TimeRemainingDisplay = (props: TimeRemainingDisplayProps) => {
  const { minutes, seconds, completed, onTimeOut } = props
  if (completed) {
    onTimeOut()
    return <span>00:00</span>
  } else if (minutes < 10 && seconds < 10)
    return (
      <span>
        0{minutes}:0{seconds}
      </span>
    )
  else if (minutes < 10)
    return (
      <span>
        0{minutes}:{seconds}
      </span>
    )
  else if (seconds < 10)
    return (
      <span>
        {minutes}:0{seconds}
      </span>
    )
  return (
    <span>
      {minutes}:{seconds}
    </span>
  )
}
