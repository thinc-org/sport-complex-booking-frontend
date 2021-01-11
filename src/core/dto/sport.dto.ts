export interface Court {
  court_num: number
  open_time: number
  close_time: number
  _id: string
  __v: number
}
export interface Sport {
  sport_name_th: string
  sport_name_en: string
  required_user: number
  quota: number
  list_court: Court[]
  _id: string
  __v: number
}
