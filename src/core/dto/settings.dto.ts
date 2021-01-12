import { Sport, Court } from "./sport.dto"

// Court settings DTO

export interface ListCourts {
  allSport_length: number
  sport_list: Sport[]
}

export interface ListCourtResponse {
  allSport_length: number
  sport_list: Sport[]
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
  courts: Court[]
  currentCourt: Court | undefined
  currentSportName: string | undefined
  currentSportId: string
  updateCourt: (value: string) => void
}

export interface DeleteCourtModalProps {
  show: boolean
  setShow: (value: boolean) => void
  deleteCourt: (value1: string, value2: string) => void
  currentCourt: Court
  currentSportId: string
}

export interface AddCourtFuncProps {
  show: boolean
  setShow: (value: boolean) => void
  onChangeOpenTime: React.Dispatch<React.SetStateAction<string>>
  onChangeCloseTime: React.Dispatch<React.SetStateAction<string>>
  openTime: string
  closeTime: string
  courts: Court[]
  updateCourt: (value: string) => void
  currentSportId: string
}

export interface DeleteSportProps {
  show: boolean
  setShow: (value: boolean) => void
  mainFunction: (value: Sport) => void
  data: Sport
}

export interface AddSportProps {
  show: boolean
  setShow: (value: boolean) => void
  onSubmitAddSport: (sport: Sport) => void
}

export interface HandleErrorProps {
  show: boolean
  setShow: (value: boolean) => void
}

export interface EditSportProps {
  show: boolean
  setShow: (value: boolean) => void
  setCurrentSport: (value: Sport) => void
  sendEdittedSportInfo: (value: Sport) => void
  currentSport: Sport
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
