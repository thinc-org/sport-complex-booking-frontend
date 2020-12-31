import { History, LocationState } from "history"

export interface HistoryProps {
 history: History<LocationState>
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