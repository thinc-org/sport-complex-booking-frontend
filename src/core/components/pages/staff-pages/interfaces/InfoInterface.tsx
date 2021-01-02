export enum Account {
  CuStudent,
  SatitAndCuPersonel,
  Other,
}

export enum ThaiLangAccount {
  นิสิตจุฬา,
  นักเรียนสาธิตจุฬาหรือบุคลากรจุฬา,
  อื่นๆ,
}

export default interface Info {
  prefix: string
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  gender: string
  birthday: Date
  national_id: string
  marital_status: string
  address: string
  email: string
  phone: string
  home_phone: string
  medical_condition: string
  contact_person: ContactPerson
  membership_type: string
  // object id //
  user_photo: string
  medical_certificate: string
  national_id_photo: string
  house_registration_number: string
  relationship_verification_document: string
}

export interface CuInfo {
  account_type: Account
  is_thai_language: boolean
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
  personal_email: string
  phone: string
  is_penalize: boolean
  expired_penalize_date: Date
  is_first_login: boolean
}

export interface AddInfo {
  membership_type: string
  is_thai_language: boolean
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
  password: string
  personal_email: string
  phone: string
}

export interface OtherInfo {
  _id: string
  username: string
  name_en: string
  surname_en: string
  personal_email: string
  phone: string
}

export interface ContactPerson {
  contact_person_prefix: string
  contact_person_name: string
  contact_person_surname: string
  contact_person_home_phone: string
  contact_person_phone: string
}

export interface RejectInfo {
  Information: boolean
  "Emergency contact": boolean
  Photo: boolean
  "National ID/Passport": boolean
  "Medical certificate": boolean
  "House registeration": boolean
  "Relation verification": boolean
}

export interface ModalVerify {
  show_confirm_accept: boolean
  show_uncom_accept: boolean
  show_complete_accept: boolean
  show_uncom_reject: boolean
  show_confirm_reject: boolean
  show_complete_reject: boolean
  show_err: boolean
}

export interface ModalUserInfo {
  show_delete: boolean
  show_com_delete: boolean
  show_save: boolean
  show_com_save: boolean
  show_err: boolean
}
