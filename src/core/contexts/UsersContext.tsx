import React, { createContext } from 'react';
import { useState } from "react"

type AccountType = "CuStudent" | "SatitCuPersonel" | "Other"

interface DefaultAccount {
  account_type: AccountType
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

interface CuStudent extends DefaultAccount {
  account_type: "CuStudent"
  is_first_login: boolean
}

interface SatitCuPersonel extends DefaultAccount {
  account_type: "SatitCuPersonel"
  password: string
}

interface Other extends DefaultAccount {
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
  password: string, //pass=phone(editable)
  verification_status: string,
  rejected_info: string[],
  account_expiration_date: Date,
  user_photo: string, //(ของcollectionที่เก็บรูป)
  medical_certificate: string,
  national_id_photo: string, //also passport photo
  house_registration_number: string,//with reference person
  relationship_verification_document: string,
}

interface UserConstruct {
  CuStudent: CuStudent | undefined,
  SatitCuPersonel: SatitCuPersonel| undefined,
  Other: Other| undefined
  setCuStudent: (CuStudent: CuStudent)=>void
  setSatitCuPersonel:(SatitCuPersonel: SatitCuPersonel)=>void
  setOther: (Other: Other)=>void
}

export const UserContext = createContext({} as UserConstruct)

export default function UserContextProvider({...props}) {
  const [CuStudent, setCuStudent] = useState<CuStudent>()
  const [SatitCuPersonel, setSatitCuPersonel] = useState<SatitCuPersonel>()
  const [Other, setOther] = useState<Other>()
  const value = { CuStudent, SatitCuPersonel, Other, setCuStudent, setSatitCuPersonel, setOther }
  return <UserContext.Provider value={value} {...props}/>
}
