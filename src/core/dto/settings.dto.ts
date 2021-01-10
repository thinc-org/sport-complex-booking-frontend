// Court settings DTO

export interface ListCourts {
  allSport_length: number
  sport_list: SportData[]
}

export interface ListCourtResponse {
  allSport_length: number
  sport_list: SportData[]
}

export interface CourtData {
  court_num: number
  open_time: number
  close_time: number
  _id: string
  __v: number
}

export interface NoCourtsModalProps {
  show: boolean
  setShow: (value: boolean) => void
}

export interface EditCourtProps {
  show: boolean
  setShow: (value: boolean) => void
  openTime: string
  closeTime: string
  onChangeOpenTime: React.Dispatch<React.SetStateAction<string>>
  onChangeCloseTime: React.Dispatch<React.SetStateAction<string>>
  courts: CourtData[]
  currentCourt: CourtData | undefined
  currentSportName: string | undefined
  currentSportId: string
  updateCourt: (value: string) => void
}

export interface DeleteCourtModalProps {
  show: boolean
  setShow: (value: boolean) => void
  deleteCourt: (value1: string, value2: string) => void
  currentCourt: CourtData
  currentSportId: string
}

export interface AddCourtFuncProps {
  show: boolean
  setShow: (value: boolean) => void
  onChangeOpenTime: React.Dispatch<React.SetStateAction<string>>
  onChangeCloseTime: React.Dispatch<React.SetStateAction<string>>
  openTime: string
  closeTime: string
  courts: CourtData[]
  updateCourt: (value: string) => void
  currentSportId: string
}

// Sport settings DTO

export interface SportData {
  _id?: string
  sport_name_th: string
  sport_name_en: string
  required_user: number
  quota: number
  list_court: CourtData[]
}

export interface DeleteSportProps {
  show: boolean
  setShow: (value: boolean) => void
  mainFunction: (value: SportData) => void
  data: SportData
}

export interface AddSportProps {
  show: boolean
  setShow: (value: boolean) => void
  onSubmitAddSport: (sport: SportData) => void
}

export interface HandleErrorProps {
  show: boolean
  setShow: (value: boolean) => void
}

export interface EditSportProps {
  show: boolean
  setShow: (value: boolean) => void
  setCurrentSport: (value: SportData) => void
  sendEdittedSportInfo: (value: SportData) => void
  currentSport: SportData
}

// Time Settings DTO

export interface TimeSettingsData {
  waiting_room_duration: number
  late_cancelation_punishment: number
  absence_punishment: number
  late_cancelation_day: number
}

export interface SettingsCardProps {
  type: "absencePunishment" | "lateCancelPunishment" | "lateCancelDay" | "waitingRooomDuration"
  set: (value: number) => void
  value: number
  cardTitle: string
  unit: string
}

export interface EditTimeModalProps {
  show: boolean
  setShow: (value: boolean) => void
}
