//enums
import { Account } from "../../../../dto/account.dto"

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
  // object id //
  user_photo: string
  medical_certificate: string
  national_id_photo: string
  house_registration_number: string
  relationship_verification_document: string
}

export interface EditComponentInfo {
  prefix: string
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  gender: string
  birthday: Date
  national_id: string
  marital_status_text: string
  address: string
  email: string
  phone: string
  home_phone: string
  medical_condition: string
  username: string
  contact_person_prefix: string
  contact_person_name: string
  contact_person_surname: string
  contact_person_home_phone: string
  contact_person_phone: string
}

export interface CuSatitComponentInfo {
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  personal_email: string
  phone: string
}

export interface PasswordToggle {
  oldPassword: boolean
  newPassword: boolean
  confirmPassword: boolean
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

export interface AddUserComponentInfo {
  is_thai_language: boolean
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
  phone: string
  password: string
  confirmPassword: string
}

export interface OtherInfo {
  _id: string
  username: string
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  phone: string
  personal_email: string
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
  gender: boolean
  name_th: boolean
  surname_th: boolean
  name_en: boolean
  surname_en: boolean
  birthday: boolean
  national_id: boolean
  marital_status: boolean
  address: boolean
  personal_email: boolean
  home_phone: boolean
  phone: boolean
  medical_condition: boolean
  contact_person_prefix: boolean
  contact_person_name: boolean
  contact_person_surname: boolean
  contact_person_home_phone: boolean
  contact_person_phone: boolean
  user_photo: boolean
  medical_certificate: boolean
  national_id_photo: boolean
  house_registration_number: boolean
  relationship_verification_document: boolean
}

export const RejectInfoLabel: Record<keyof RejectInfo, string> = {
  prefix: "Prefix",
  gender: "Gender",
  name_th: "Thai name",
  surname_th: "Thai surname",
  name_en: "English name",
  surname_en: "English surname",
  birthday: "Birthdate",
  national_id: "National ID number",
  marital_status: "Marital status",
  address: "Address",
  personal_email: "Email",
  home_phone: "Home phone",
  phone: "Mobile phone",
  medical_condition: "Medical condition",
  contact_person_prefix: "Contact person's prefix",
  contact_person_name: "Contact person's name",
  contact_person_surname: "Contact person's surname",
  contact_person_home_phone: "Contact person's home phone",
  contact_person_phone: "Contact person's mobile phone",
  user_photo: "Photo",
  medical_certificate: "Medical certificate",
  national_id_photo: "National ID / Passport photo",
  house_registration_number: "House registration photo",
  relationship_verification_document: "Relation verification photo",
}

export type RejectInfoLabelKey = keyof RejectInfo

// Modals //
export interface ModalVerify {
  showConfirmAccept: boolean
  showUncomAccept: boolean
  showCompleteAccept: boolean
  showUncomReject: boolean
  showConfirmReject: boolean
  showCompleteReject: boolean
  showErr: boolean
}

export interface ModalUserInfo {
  showDelete: boolean
  showComDelete: boolean
  showSave: boolean
  showComSave: boolean
  showErr: boolean
  showPasswordErr: boolean
  showConfirmChange: boolean
  showChangePassword: boolean
}

export interface ModalAddUser {
  showAdd: boolean
  showCom: boolean
  showErr: boolean
  showUsernameErr: boolean
}

// Alerts //
export interface AlertAddUser {
  showAlertUncom: boolean
  showAlertUsername: boolean
  showAlertPassword: boolean
}
