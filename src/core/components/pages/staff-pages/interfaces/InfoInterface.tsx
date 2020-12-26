// enums //
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

// interfaces //
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
  password: string
  // object id //
  user_photo: string
  medical_certificate: string
  national_id_photo: string
  house_registration_number: string
  relationship_verification_document: string
}

export interface CuAndSatitInfo {
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
  password: string
}

export interface PasswordToggle {
  old_password: boolean
  new_password: boolean
  confirm_password: boolean
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
  personal_email: string,
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
  prefix: boolean
  name_th: boolean
  surname_th: boolean
  name_en: boolean
  surname_en: boolean
  birthday: boolean
  national_id: boolean
  gender: boolean
  marital_status: boolean
  address: boolean
  phone: boolean
  home_phone: boolean
  personal_email: boolean
  contact_person_prefix: boolean
  contact_person_name: boolean
  contact_person_surname: boolean
  contact_person_home_phone: boolean
  contact_person_phone: boolean
  medical_condition: boolean
  membership_type: boolean
  username: boolean
  password: boolean
  user_photo: boolean
  medical_certificate: boolean
  national_id_photo: boolean
  house_registration_number: boolean
  relationship_verification_document: boolean
}

export const RejectInfoLabel = {
  prefix: "Prefix",
  name_th: "Thai name",
  surname_th: "Thai surname",
  name_en: "English name",
  surname_en: "English surname",
  birthday: "Birthdate",
  national_id: "National ID number",
  gender: "Gender",
  marital_status: "Marital status",
  address: "Address",
  phone: "Mobile phone",
  home_phone: "Home phone",
  personal_email: "Email",
  contact_person_prefix: "Contact person's prefix",
  contact_person_name: "Contact person's name",
  contact_person_surname: "Contact person's surname",
  contact_person_home_phone: "Contact person's home phone",
  contact_person_phone: "Contact person's mobile phone",
  medical_condition: "Medical condition",
  membership_type: "Membership type",
  username: "Username",
  password: "Password",
  user_photo: "Photo",
  medical_certificate: "Medical certificate",
  national_id_photo: "National ID / Passport photo",
  house_registration_number: "House registration photo",
  relationship_verification_document: "Relation verification photo",
}

// Interface for Modals //
export interface ModalCuAndSatit {
  show_confirm: boolean
  show_com: boolean
  show_del: boolean
  show_com_delete: boolean
  show_err: boolean
  show_password_err: boolean
  show_confirm_change: boolean
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
  show_password_err: boolean
  show_confirm_change: boolean
}
