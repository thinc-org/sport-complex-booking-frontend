export const dayArr = {
    0: 'อาทิตย์',
    1: 'จันทร์',
    2: 'อังคาร',
    3: 'พุทธ',
    4: 'พฤหัสบดี',
    5: 'ศุกร์',
    6: 'เสาร์',
}

export function getMinute(time_slot: number[]) {
    const sortedTimeSlot = [...time_slot].sort()
    const startTime = 0 + (30 * (sortedTimeSlot[0]) - 30)
    const endTime = 0 + (30 * (sortedTimeSlot[sortedTimeSlot.length - 1]))
    return { startTime, endTime }
}

export function getTime(time: number) {
    return `${Math.floor(time / 60)}:${time % 60 === 0 ? time % 60 + '0' : time % 60}`
}