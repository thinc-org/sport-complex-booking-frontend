import { CuStudent, Other, SatitCuPersonel } from "../contexts/UsersContext"

export interface ValidityMessage {
  reason: string
  message: string
}

export interface ErrorMsgBannerProps {
  errorMsg: string
  type: string
}

export interface ErrorMessageBannerProps {
  show: boolean
  reason: string
  type: string
}

export interface CreateResponse {
  message: string
  statusCode: number
}

export interface HoorayHistoryStates {
  fromJoinWaitingRoom: boolean
}

export interface BanHistoryStates {
  msg: string
}

export interface WaitingRoomData {
  sport_id: string
  court_number: number
  time_slot: number[]
  date: Date
}

export interface WaitingRoomAccessCode {
  isReservationCreated: boolean
  access_code: string
}

export interface CourtData {
  close_time: number
  court_num: number
  open_time: number
  _id: string
}

export interface SportData {
  list_court: CourtData[]
  quota: number
  required_user: number
  sport_name_en: string
  sport_name_th: string
  __v: number
  _id: string
}

export interface MemberResponse {
  name_th: string
  name_en: string
}

export interface WaitingRoomResponse {
  list_member: (CuStudent | SatitCuPersonel | Other)[]
  expired_date: Date
  sport_id: SportData
  date: Date
  time_slot: number[]
  _id: string
  access_code: string
}
