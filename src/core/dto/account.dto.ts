export enum Account {
  CuStudent = "CuStudent",
  SatitAndCuPersonel = "SatitAndCuPersonel",
  Other = "Other",
}

export interface AccountProps {
  toggleEditButton: () => void
}

export interface Token {
  token: string
}

export type FileName = "user_photo" | "national_id_photo" | "medical_certificate" | "house_registration_number" | "relationship_verification_document"
