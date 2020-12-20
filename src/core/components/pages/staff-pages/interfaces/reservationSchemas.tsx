export default interface SuccessfulReservation {
  _id: string
  sport_id: string
  court_num: number
  date: Date
  time_slot: BookingTime[]
  list_member: { member_object_id: string }[]
  is_check: boolean
}

export interface WaitingRoom {
  _id: string
  sport_id: string
  court_num: number
  date: Date
  time_slot: BookingTime[]
  list_member: { member_object_id: string }[]
  access_code: string
  expired_time: Date
}

export interface BookingTime {
  start_time: number
  end_time: number
}

export interface DeleteModal {
  show_confirm_del: boolean
  show_com_del: boolean
  show_err: boolean
}
