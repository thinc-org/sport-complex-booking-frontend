import { VerifyInfoRes } from "./verification.dto"

export type UserListRes = [number, UserInfoRes[]]

export enum Account {
  CuStudent = "CuStudent",
  SatitAndCuPersonel = "SatitAndCuPersonel",
  Other = "Other",
}

export interface UserInfoRes extends VerifyInfoRes {
  is_penalize: boolean
}
