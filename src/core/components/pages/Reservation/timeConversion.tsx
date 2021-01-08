export const timeConversion = (input: number) => {
  let start_hour = 0
  let start_min = 0
  let end_hour = 0
  let end_min = 0
  let start = ""
  let end = ""
  let timeFormat = ""
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
