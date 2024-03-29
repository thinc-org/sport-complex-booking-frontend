import React, { createContext, useState } from "react"

export type AccountType = "CuStudent" | "SatitAndCuPersonel" | "Other"

type OnlyString<P> = { [K in keyof P]: P[K] extends string ? K | "payment_slip" : never }[keyof P]
type SatitOnlyString<P> = { [K in keyof P]: P[K] extends string ? K : never }[keyof P]

export interface DefaultAccount {
  account_type: AccountType
  is_thai_language: boolean
  name_en: string
  surname_en: string
  name_th: string
  surname_th: string
  username: string //username=student id
  personal_email: string
  phone: string
  is_penalize: boolean
  expired_penalize_date: Date | null
}

export interface CuStudent extends DefaultAccount {
  account_type: "CuStudent"
  is_first_login: boolean
}

export interface SatitCuPersonel extends DefaultAccount {
  account_type: "SatitAndCuPersonel"
  previous_student_card_photo: string[]
  verification_status: string
  student_card_photo: string
  rejected_info: SatitOnlyString<Omit<SatitCuPersonel, "account_type" | "rejected_info">>[]
  account_expiration_date: Date
  document_status: string
}

export interface Other extends DefaultAccount {
  account_type: "Other"
  prefix: string //(เพื่อแสดง นาย/นาง/นางสาว)
  birthday: string //(use this for cal age)
  national_id: string //(also pasport no in foreign)
  gender: string
  marital_status: string
  address: string
  home_phone: string
  contact_person: {
    contact_person_prefix: string
    contact_person_name: string
    contact_person_surname: string
    contact_person_home_phone: string
    contact_person_phone: string
  }
  contact_person_prefix: string
  contact_person_name: string
  contact_person_surname: string
  contact_person_home_phone: string
  contact_person_phone: string
  medical_condition: string
  membership_type: string
  verification_status: string
  rejected_info: OnlyString<Omit<Other, "account_type" | "rejected_info">>[]
  account_expiration_date: Date
  user_photo: string //(ของcollectionที่เก็บรูป)
  medical_certificate: string
  national_id_house_registration: string // (national_id/passport photo) or house_registration
  relationship_verification_document: string
  payment_slip: string // lastest payment slip (for extension only)
  previous_payment_slips: string[] // 2 previous payment slips
  document_status: string
}

export interface RegisterResponse {
  jwt: string
  user: Other
}

export type AccountInfo = DefaultAccount | CuStudent | SatitCuPersonel | Other

export interface UserConstruct {
  cuStudentAccount: CuStudent | undefined
  satitCuPersonelAccount: SatitCuPersonel | undefined
  otherAccount: Other | undefined
  setCuStudentAccount: (CuStudent: CuStudent) => void
  setSatitCuPersonelAccount: (SatitCuPersonel: SatitCuPersonel) => void
  setOtherAccount: (Other: Other) => void
  clearUser: () => void
}

export const UserContext = createContext({} as UserConstruct)

export default function UserContextProvider({ ...props }) {
  const [cuStudentAccount, setCuStudentAccount] = useState<CuStudent>()
  const [satitCuPersonelAccount, setSatitCuPersonelAccount] = useState<SatitCuPersonel>()
  const [otherAccount, setOtherAccount] = useState<Other>()
  const clearUser = () => {
    setOtherAccount(undefined)
  }
  const value = { cuStudentAccount, satitCuPersonelAccount, otherAccount, setCuStudentAccount, setSatitCuPersonelAccount, setOtherAccount, clearUser }
  return <UserContext.Provider value={value} {...props} />
}
