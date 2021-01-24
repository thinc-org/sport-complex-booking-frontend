import { CuStudent, Other, SatitCuPersonel } from "../contexts/UsersContext"

export enum Account {
  CuStudent = "CuStudent",
  SatitAndCuPersonel = "SatitAndCuPersonel",
  Other = "Other",
}

export interface AccountProps {
  toggleEditButton: () => void
  user?: CuStudent | SatitCuPersonel | Other
}

export interface Token {
  token: string
}

export type FileName = "user_photo" | "national_id_photo" | "medical_certificate" | "house_registration_number" | "relationship_verification_document"

export interface NameResponse {
  name_th: string
  name_en: string
}

export interface PenalizeMessageProps {
  show?: boolean
  penalizeEndDate: string
}

export interface DocumentUploadResponse {
  user_photo?: string
  national_id_photo?: string
  medical_certificate?: string
  house_registration_number?: string
  relationship_verification_document?: string
}
