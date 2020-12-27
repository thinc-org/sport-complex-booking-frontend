import React, { createContext } from 'react';
import { useState } from "react"

interface UserConstruct {
  jwt: string,
  is_thai_language: boolean,
  account_type: string,
  CuStudent: {
    account_type: string
    is_thai_language: boolean
    name_en: string,
    surname_en: string,
    name_th: string,
    surname_th: string,
    username: string, //username=student id
    personal_email: string,
    phone: string,
    is_penalize: boolean,
    expired_penalize_date: Date,
    is_first_login: boolean,
  },
  SatitCuPersonel: {
    account_type: string,
    is_thai_language: boolean,
    name_en: string,
    surname_en: string,
    name_th: string,
    surname_th: string,
    personal_email: string,
    phone: string,
    username: string,
    password: string,
    is_penalize: boolean,
    expired_penalize_date: Date,
  },
  Other: {
    account_type: string,
    is_thai_language: boolean,
    prefix: string, //(เพื่อแสดง นาย/นาง/นางสาว)
    name_en: string,
    surname_en: string,
    name_th: string,
    surname_th: string,
    birthday: Date, //(use this for cal age)
    national_id: string, //(also pasport no in foreign) 
    gender: string,
    marital_status: string,
    address: string,
    phone: string,
    home_phone: string,
    personal_email: string,
    contact_person: {
      contact_person_prefix: string,
      contact_person_name: string,
      contact_person_surname: string,
      contact_person_home_phone: string,
      contact_person_phone: string,
    },
    medical_condition: string,
    membership_type: string,
    username: string, //username=email (cannot change)
    password: string, //pass=phone(editable)
    is_penalize: boolean,
    expired_penalize_date: Date,
    verification_status: string,
    rejected_info: string[],
    account_expiration_date: Date,
    user_photo: String, //(ของcollectionที่เก็บรูป)
    medical_certificate: String,
    national_id_photo: String, //also passport photo
    house_registration_number: String,//with reference person
    relationship_verification_document: String,
  }
  setCuStudent:Function
  setSatit:Function
  setOther:Function
  setLanguage: Function
}

export const UserContext = createContext({} as UserConstruct)

export default function UserContextProvider(props) {
  const accountSchemaType = { type: String, enum: ['CuStudent', 'SatitAndCuPersonel', 'Other'] };
  const verificationSchemaType = { type: String, enum: ['NotSubmitted', 'Submitted', 'Verified', 'Rejected'] };

  const [state, setState] = useState({
    jwt: "",
    is_thai_language: Boolean,
    account_type: accountSchemaType,
    CuStudent: {
      account_type: accountSchemaType,
      is_thai_language: Boolean,
      name_en: String,
      surname_en: String,
      name_th: String,
      surname_th: String,
      username: String, //username=student id
      personal_email: String,
      phone: String,
      is_penalize: Boolean,
      expired_penalize_date: Date,
      is_first_login: Boolean,
    },
    SatitCuPersonel: {
      account_type: accountSchemaType,
      is_thai_language: Boolean,
      name_en: String,
      surname_en: String,
      name_th: String,
      surname_th: String,
      personal_email: String,
      phone: String,
      username: String,
      password: String,
      is_penalize: Boolean,
      expired_penalize_date: Date,
    },
    Other: {
      account_type: accountSchemaType,
      is_thai_language: Boolean,
      prefix: String, //(เพื่อแสดง นาย/นาง/นางสาว)
      name_en: String,
      surname_en: String,
      name_th: String,
      surname_th: String,
      birthday: Date, //(use this for cal age)
      national_id: String, //(also pasport no in foreign) 
      gender: String,
      marital_status: String,
      address: String,
      phone: String,
      home_phone: String,
      personal_email: String,
      contact_person: {
        contact_person_prefix: String,
        contact_person_name: String,
        contact_person_surname: String,
        contact_person_home_phone: String,
        contact_person_phone: String,
      },
      medical_condition: String,
      membership_type: String,
      username: String, //username=email (cannot change)
      password: String, //pass=phone(editable)
      is_penalize: Boolean,
      expired_penalize_date: Date,
      verification_status: verificationSchemaType,
      rejected_info: [String],
      account_expiration_date: Date,
      user_photo: Object, //(ของcollectionที่เก็บรูป)
      medical_ceritficate: Object,
      national_id_photo: Object, //also passport photo
      house_registration_number: Object,//with reference person
      relationship_verification_document: Object,
    }

  })

  const setCuStudent = (value) => {
    state.CuStudent = value
    console.log("SET VALUE IS CALLED", state.CuStudent)
  }
  const setSatit = (value) => {
    state.SatitCuPersonel = value
    console.log("SET VALUE IS CALLED", state.SatitCuPersonel)
  }
  const setOther = (value) => {
    state.Other = value
    console.log("SET VALUE IS CALLED", state.Other)
  }
  const setLanguage = (value) => {
    setState({ ...state, is_thai_language: value })
    console.log("SET VALUE IS CALLED", state)
  }
  const value = { ...state, setState, setLanguage, setCuStudent, setSatit, setOther }
  return <UserContext.Provider value={value} {...props}/>

}