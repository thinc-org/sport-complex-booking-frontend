import React, { createContext } from 'react';
import { useState } from "react"

type AccountType = "CuStudent" | "SatitCuPersonel" | "Other"

export interface DefaultAccount {
  account_type: string
  is_thai_language: boolean
  name_en: string
  surname_en: string
  name_th: string
  surname_th: string
  username: string, //username=student id
  personal_email: string
  phone: string
  is_penalize: boolean
  expired_penalize_date: Date
}

export interface CuStudent extends DefaultAccount {
  account_type: "CuStudent"
  is_first_login: boolean
}

export interface SatitCuPersonel extends DefaultAccount {
  account_type: "SatitCuPersonel"
}

export interface Other extends DefaultAccount {
  account_type: "Other",
  prefix: string, //(เพื่อแสดง นาย/นาง/นางสาว)
  birthday: Date, //(use this for cal age)
  national_id: string, //(also pasport no in foreign) 
  gender: string,
  marital_status: string,
  address: string,
  home_phone: string,
  contact_person: {
    contact_person_prefix: string,
    contact_person_name: string,
    contact_person_surname: string,
    contact_person_home_phone: string,
    contact_person_phone: string,
  },
  medical_condition: string,
  membership_type: string,
  verification_status: string,
  rejected_info: string[],
  account_expiration_date: Date,
  user_photo: string, //(ของcollectionที่เก็บรูป)
  medical_certificate: string,
  national_id_photo: string, //also passport photo
  house_registration_number: string,//with reference person
  relationship_verification_document: string,
}

export interface UserConstruct {
  cuStudentAccount: CuStudent | undefined,
  satitCuPersonelAccount: SatitCuPersonel| undefined,
  otherAccount: Other| undefined
  setCuStudentAccount: (CuStudent: CuStudent)=>void
  setSatitCuPersonelAccount:(SatitCuPersonel: SatitCuPersonel)=>void
  setOtherAccount: (Other: Other)=>void
}

export const UserContext = createContext({} as UserConstruct)

export default function UserContextProvider(props) {
  const [cuStudentAccount, setCuStudentAccount] = useState<CuStudent>()
  const [satitCuPersonelAccount, setSatitCuPersonelAccount] = useState<SatitCuPersonel>()
  const [otherAccount, setOtherAccount] = useState<Other>()
  const value = { cuStudentAccount, satitCuPersonelAccount, otherAccount, setCuStudentAccount, setSatitCuPersonelAccount, setOtherAccount }
  return <UserContext.Provider value={value} {...props}/>
}
