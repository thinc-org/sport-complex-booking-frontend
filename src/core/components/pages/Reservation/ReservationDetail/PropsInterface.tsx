import { NameResponse } from "../../../../dto/account.dto"
import { SportResponse } from "../../../../dto/reservation.dto"

export interface ButtonAndWarningProps {
  isCheck: boolean | undefined
  id: string | undefined
  reservedTime: number | undefined
  lateCancellationDay: number | undefined
  setLateCancellationDay: (num: number | undefined) => void
  lateCancellationPunishment: number | undefined
  setLateCancellationPunishment: (num: number | undefined) => void
}

export interface DetailProps {
  sport: SportResponse | undefined
  courtNum: number | undefined
  date: string | undefined
  timeList: number[] | undefined
  memberList: NameResponse[] | undefined
}

export interface QRCodeProps {
  isCheck: boolean | undefined
  id: string | undefined
  validTime: number | undefined
  setValidTime: (num: number) => void
}
