import { Account } from "./account.dto"
import { CuStudent, Other, SatitCuPersonel } from "../contexts/UsersContext"

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

export interface LocationResponse {
  id: string
  path: string
}

export interface SportResponse {
  sport_name_th: string
  sport_name_en: string
}

export interface ReservationDetailResponse {
  sport_id: SportResponse
  court_number: number
  date: Date
  time_slot: number[]
  list_member: (CuStudent | Other | SatitCuPersonel)[]
  is_check: boolean
  late_cancelation_day: number
  late_cancelation_punishment: number
}

export interface ReservationResponse {
  _id: string
  is_check: boolean
  sport_id: SportResponse
  court_number: number
  date: Date
  time_slot: number[]
  day_of_week: number
  list_member: (CuStudent | SatitCuPersonel | Other)[]
}
