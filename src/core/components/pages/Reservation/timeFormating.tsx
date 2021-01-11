import React from "react"

export const timeConversion = (input: number) => {
  let start_hour: number = 0
  let start_min: number = 0
  let end_hour: number = 0
  let end_min: number = 0
  let start = ""
  let end = ""
  let timeFormat: string = ""
  if (input % 2 === 0) {
    end_hour = input / 2
    end_min = 0
  } else if (input % 2 === 1) {
    end_hour = ~~(input / 2)
    end_min = 30
  }

  //~~(10/3) = 3

  if (~~(end_hour / 10 === 0) && end_min === 0) {
    end = "0" + end_hour + ":00"
  } else if (~~(end_hour / 10 === 0) && end_min === 30) {
    end = "0" + end_hour + ":30"
  } else if (~~(end_hour / 10 !== 0) && end_min === 0) {
    end = end_hour + ":00"
  } else if (~~(end_hour / 10 !== 0) && end_min === 30) {
    end = end_hour + ":30"
  }

  if (end_min === 30) {
    start_min = 0
    start_hour = end_hour
  } else if (end_min === 0) {
    start_min = 30
    start_hour = end_hour - 1
  }

  if (~~(start_hour / 10 === 0) && start_min === 0) {
    start = "0" + start_hour + ":00"
  } else if (~~(start_hour / 10 === 0) && start_min === 30) {
    start = "0" + start_hour + ":30"
  } else if (~~(start_hour / 10 !== 0) && start_min === 0) {
    start = start_hour + ":00"
  } else if (~~(start_hour / 10 !== 0) && start_min === 30) {
    start = start_hour + ":30"
  }

  timeFormat = start + "-" + end + " "

  return timeFormat
}

export const timeShift = (time, shiftedHours) => {
  shiftedHours = shiftedHours * 60 * 60 * 1000
  return time + shiftedHours
}

export const timeRemainingDisplay = (minutes, seconds, completed, timeOut) => {
  if (completed) {
    timeOut()
    return <span>00:00</span>
  } else if (minutes < 10 && seconds < 10)
    return (
      <span>
        {" "}
        0{minutes}:0{seconds}{" "}
      </span>
    )
  else if (minutes < 10)
    return (
      <span>
        {" "}
        0{minutes}:{seconds}{" "}
      </span>
    )
  else if (seconds < 10)
    return (
      <span>
        {" "}
        {minutes}:0{seconds}{" "}
      </span>
    )
  return (
    <span>
      {" "}
      {minutes}:{seconds}{" "}
    </span>
  )
}
