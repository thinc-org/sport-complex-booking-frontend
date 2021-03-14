import { ReservationResponse } from "./reservation.dto"
import { Sport } from "./sport.dto"
import { WaitingRoomResponse } from "./waitingRoom.dto"
export interface DeleteButtonProps {
  onClick?: (indx: number | string, type: string) => void
  indx: number | string
  type?: string
  phone?: string
}

export interface RowProps {
  starting_date: Date
  expired_date: Date
  sport_id: Sport
  court_num: number
  description?: string
  _id: string
  button?: JSX.Element
}

export interface Option {
  sportType: string[]
  courtNum: number[]
}

export interface QueryParams {
  starting_date?: Date
  expired_date?: Date
  sportObjId?: string
  court_num?: number
  description?: string
  start: number
  shouldChange?: boolean
  end: number
}

export interface disable_time {
  day: number
  time_slot: number[]
}

export interface ViewRowProps {
  indx: number
  day: number
  time_slot: number[]
  button?: JSX.Element
}

export interface View {
  sport_id: Sport
  court_num: number
  starting_date: string
  expired_date: string
  description?: string
}

export interface ViewResponse extends View {
  disable_time: disable_time[]
}

export interface TableProps<T> {
  data?: (T & { _id?: number | string; type?: string })[]
  header: string[]
  Row: React.FC<
    T & {
      indx: number
      button?: JSX.Element
    }
  >
  Button?: React.FC<DeleteButtonProps & { indx: number | string }>
}
export interface AddCourtForm {
  court_num: string
  sportObjId: string
}
export interface OverlapData {
  reservation?: ReservationResponse[]
  waitingRoom?: WaitingRoomResponse[]
}

export interface OverlapDataTableProps {
  overlapData?: OverlapData
}

export interface ErrorRowProps {
  type: string
  _id: string
  indx: number
  phone: string
  date: Date
  time_slot: number[]
  button?: JSX.Element
}
export interface ModalProps {
  inProp: boolean
  header: string
  message: string
  children?: JSX.Element
  handleClose: (event: React.MouseEvent) => void
  canCancel?: boolean
  onCancel?: (event: React.MouseEvent) => void
}
export interface FormModalProps {
  inProp: boolean
  handleClose: () => void
  onSubmit: (form: TimeSlotRow) => void
  validate: (value: TimeSlotRow) => boolean
}

export interface TimeSlotRow {
  day: string
  timeSlotStart: string
  timeSlotEnd: string
}

export interface DisableTime {
  day: number
  time_slot: number[]
}

export interface DisableCourtBody {
  description: string
  sport_id: string
  court_num: number
  starting_date: Date
  expired_date: Date
  disable_time: DisableTime[]
}

export interface DisabledCourtSearchBody {
  starting_date?: string
  expired_date?: string
  sport_id?: string
  court_num?: number
  start?: number
  end?: number
  lean?: boolean
  description?: string
}

export interface ListOfCourtsForm {
  sports?: string
  startDate?: Date
  endDate?: Date
  courtNum?: string
}
