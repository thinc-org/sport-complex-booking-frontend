export const convertDate = (date: Date) => {
  if (date < new Date()) {
    date = new Date()
  }
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  let year = date.getFullYear()
  let format_date = year + "-" + month + "-" + day
  return format_date
}

export const convertTime = (hour: number, min: number): string => {
  return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min)
}
