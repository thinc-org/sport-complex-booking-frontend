export const dayArr = [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุทธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์',
]

export function getMinute(time_slot: number[]) {
    const sortedTimeSlot = [...time_slot].sort((a, b) => a - b)
    const startTime = 0 + (30 * (sortedTimeSlot[0]) - 30)
    const endTime = 0 + (30 * (sortedTimeSlot[sortedTimeSlot.length - 1]))
    return { startTime, endTime }
}

export function getTime(time: number): string {
    return `${Math.floor(time / 60)}:${time % 60 === 0 ? time % 60 + '0' : time % 60}`
}

export function getTimeArr(): string[] {
    const timeArr: string[] = []
    for (let i = 1; i <= 48; i++) {
        timeArr.push(getTime((i - 1) * 30))
    }
    return timeArr
}

export function getMinuteFromTime(time: string): number {
    let result: number
    const arr = time.split(':');
    result = arr.length == 2 ? (parseInt(arr[0]) * 60 + parseInt(arr[1])) : 0
    return result;
}