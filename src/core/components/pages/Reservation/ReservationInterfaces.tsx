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
