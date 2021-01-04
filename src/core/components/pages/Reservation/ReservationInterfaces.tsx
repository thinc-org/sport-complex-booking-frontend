import { History, LocationState } from "history"

export interface HoorayHistoryStates {
  msg: boolean
}

export interface BanHistoryStates {
  msg: string
}

export interface WaitingRoomData {
  sport_id: string,
  court_number: number,
  time_slot: number[],
  date:Date
}

export interface WaitingRoomAccessCode {
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