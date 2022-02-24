import { VerifyInfoRes } from "./verification.dto"

export enum Account {
  CuStudent = "CuStudent",
  SatitAndCuPersonel = "SatitAndCuPersonel",
  Other = "Other",
}

export interface UserInfoRes extends VerifyInfoRes {
  is_penalize: boolean
  account_expiration_date?: string
}

export type UserListRes = [number, UserInfoRes[]]
