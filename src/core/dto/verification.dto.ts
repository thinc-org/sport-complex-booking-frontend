import { Account } from "../dto/account.dto"

export type VerifyListRes = [number, VerifyInfoRes[]]

export interface VerifyInfoRes {
  account_type: Account
  name_en: string
  name_th: string
  surname_en: string
  surname_th: string
  username: string
  _id: string
}
