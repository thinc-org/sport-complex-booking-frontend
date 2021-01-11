import { Account } from "../components/pages/staff-pages/interfaces/InfoInterface"

export type Room = SuccessRoom | WaitingRoom

export type ReserveListRes = [number, Room[]]

export interface MemberInfoRes {
  account_type: Account
  personal_email: string
  phone: string
  username: string
  _id: string
}

export interface DefaultRoom {
  court_number: number
  date: Date
  list_member: MemberInfoRes[]
  sport_id: string
  time_slot: number[]
  _id: string
}

export interface SuccessRoom extends DefaultRoom {
  is_check: boolean
}

export interface WaitingRoom extends DefaultRoom {
  access_code: string
  day_of_week: number
  expired_date: Date
}

export interface TimeObject {
  startHour: string
  startMinute: string
  endHour: string
  endMinute: string
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
