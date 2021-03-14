export const dayArr = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]

export function getMinute(time_slot: number[]): { startTime: number; endTime: number } {
  const sortedTimeSlot = [...time_slot].sort((a, b) => a - b)
  const startTime = 0 + (60 * sortedTimeSlot[0] - 60)
  const endTime = 0 + 60 * sortedTimeSlot[sortedTimeSlot.length - 1]
  return { startTime, endTime }
}

export function getTime(time: number): string {
  return `${Math.floor(time / 60)}:${time % 60 === 0 ? (time % 60) + "0" : time % 60}`
}

export function getTimeArr(): string[] {
  const timeArr: string[] = []
  for (let i = 1; i <= 24; i++) {
    timeArr.push(getTime((i - 1) * 60))
  }
  return timeArr
}

export function getMinuteFromTime(time: string): number {
  const arr = time.split(":")
  const result = arr.length === 2 ? parseInt(arr[0]) * 60 + parseInt(arr[1]) : 0
  return result
}
