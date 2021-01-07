export default interface SuccessfulReservation {
  _id: string
  sport_id: string
  court_number: number
  date: Date
  time_slot: number[]
  list_member: UserInfo[]
  is_check: boolean
}

export interface WaitingRoom {
  _id: string
  sport_id: string
  court_number: number
  date: Date
  time_slot: number[]
  list_member: UserInfo[]
  access_code: string
  expired_time: Date
}

export interface Sport {
  _id: string
  sport_name_th: string
  sport_name_en: string
  required_user: number
  quota: number
  list_court: [Court]
}

export interface Court {
  court_num: number
  open_time: number
  close_time: number
}

export interface UserInfo {
  username: string
  personal_email: string
  phone: string
}

export interface TimeObject {
  startHour: string
  startMinute: string
  endHour: string
  endMinute: string
}
