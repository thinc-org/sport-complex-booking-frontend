import { CuStudent, Other, SatitCuPersonel } from "../contexts/UsersContext"
import { Sport } from "./sport.dto"

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

export interface WaitingRoomResponse {
  list_member: (CuStudent | SatitCuPersonel | Other)[]
  expired_date: Date
  sport_id: Sport
  date: Date
  time_slot: number[]
  _id: string
  access_code: string
}
