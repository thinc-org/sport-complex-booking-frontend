import { Sport, Court } from "./sport.dto"

// Court settings DTO

export interface NormalModalProps {
  show: boolean
  setShow: (value: boolean) => void
}

export interface ListCourts {
  allSport_length: number
  sport_list: Sport[]
}

export interface EditCourtProps extends NormalModalProps {
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

export interface DeleteCourtModalProps extends NormalModalProps {
  deleteCourt: (value1: string, value2: string) => void
  currentCourt: Court
  currentSportId: string
}

export interface AddCourtFuncProps extends NormalModalProps {
  onChangeOpenTime: React.Dispatch<React.SetStateAction<string>>
  onChangeCloseTime: React.Dispatch<React.SetStateAction<string>>
  openTime: string
  closeTime: string
  courts: Court[]
  updateCourt: (value: string) => void
  currentSportId: string
}

export interface DeleteSportProps extends NormalModalProps {
  mainFunction: (value: Sport) => void
  data: Sport
}

export interface AddSportProps extends NormalModalProps {
  onSubmitAddSport: (sport: Sport) => void
}

export interface EditSportProps extends NormalModalProps {
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
