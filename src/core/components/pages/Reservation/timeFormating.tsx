export const timeConversion = (input: number) => {
  let start_hour: number = 0
  let start_min: number = 0
  let end_hour: number = 0
  let end_min: number = 0
  let start = ""
  let end = ""
  let timeFormat: string = ""
  if (input % 2 == 0) {
    end_hour = input / 2
    end_min = 0
  } else if (input % 2 == 1) {
    end_hour = ~~(input / 2)
    end_min = 30
  }

  //~~(10/3) = 3

  if (~~(end_hour / 10 == 0) && end_min == 0) {
    end = "0" + end_hour + ":00"
  } else if (~~(end_hour / 10 == 0) && end_min == 30) {
    end = "0" + end_hour + ":30"
  } else if (~~(end_hour / 10 != 0) && end_min == 0) {
    end = end_hour + ":00"
  } else if (~~(end_hour / 10 != 0) && end_min == 30) {
    end = end_hour + ":30"
  }

  if (end_min == 30) {
    start_min = 0
    start_hour = end_hour
  } else if (end_min == 0) {
    start_min = 30
    start_hour = end_hour - 1
  }

  if (~~(start_hour / 10 == 0) && start_min == 0) {
    start = "0" + start_hour + ":00"
  } else if (~~(start_hour / 10 == 0) && start_min == 30) {
    start = "0" + start_hour + ":30"
  } else if (~~(start_hour / 10 != 0) && start_min == 0) {
    start = start_hour + ":00"
  } else if (~~(start_hour / 10 != 0) && start_min == 30) {
    start = start_hour + ":30"
  }

  timeFormat = start + "-" + end + " "

  return timeFormat
}

export const countDown = (endTime, timeOut, setRemainingTime) => {
  if (endTime != undefined) {
    var x = setInterval(function () {
      var current = new Date().getTime()
      var diff = Math.floor((endTime - current) / 1000)
      let min = Math.floor(diff / 60)
      let sec = diff % 60
      let formated_min = ""
      let formated_sec = ""

      if (sec > -2) {
        if (sec < 0 && min < 0) {
          console.log("timeout")
          return timeOut()
        }

        if (~~(sec / 10) == 0) {
          formated_sec = "0" + sec.toString()
        } else {
          formated_sec = sec.toString()
        }

        if (~~(min / 10) == 0) {
          formated_min = "0" + min.toString()
        } else {
          formated_min = min.toString()
        }
        return setRemainingTime(formated_min + ":" + formated_sec + " ")
      } else {
        return timeOut()
      }
    }, 1000)
    return x
  }
}

export const timeShift = (time, shiftedHours) => {
  shiftedHours = shiftedHours * 60 * 60 * 1000
  return time + shiftedHours
}
