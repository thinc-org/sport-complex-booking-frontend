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
  national_id_house_registration: string
  relationship_verification_document?: string // only for สมาชิกสามัญสมทบ ก
}

export interface VerifyComponentInfo extends Info {
  payment_slip: string
}

export interface OtherComponentInfo extends Info {
  previous_payment_slips: string[]
}

export interface VerifyExtendInfo {
  username: string
  membership_type: string
  name_th: string
  surname_th: string
  payment_slip: string
  account_expiration_date: Date
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
  personal_email: string
  phone: string
  home_phone: string
  medical_condition: string
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
  home_phone: boolean
  medical_condition: boolean
  contact_person_prefix: boolean
  contact_person_name: boolean
  contact_person_surname: boolean
  contact_person_home_phone: boolean
  contact_person_phone: boolean
  user_photo: boolean
  medical_certificate: boolean
  national_id_house_registration: boolean
  relationship_verification_document?: boolean // only for "สมาชิกสามัญสมทบ ก (staff-spouse membership)"
  payment_slip: boolean
}

export const RejectInfoLabel: Record<keyof RejectInfo, string> = {
  prefix: "คำนำหน้าชื่อ",
  gender: "เพศ",
  name_th: "ชื่อจริง",
  surname_th: "นามสกุล",
  name_en: "ชื่อจริง (ภาษาอังกฤษ)",
  surname_en: "นามสกุล (ภาษาอังกฤษ)",
  birthday: "วัน/เดือน/ปี เกิด",
  national_id: "หมายเลขบัตรประชาชน/พาสปอร์ต",
  marital_status: "สถานะการสมรส",
  home_phone: "หมายเลขโทรศัพท์บ้าน",
  medical_condition: "โรคประจำตัวหรือไม่",
  contact_person_prefix: "คำนำหน้าขื่อ ผู้ติดต่อยามฉุกเฉิน",
  contact_person_name: "ชื่อ ผู้ติดต่อยามฉุกเฉิน",
  contact_person_surname: "นามสกุล ผู้ติดต่อยามฉุกเฉิน",
  contact_person_home_phone: "หมายเลขโทรศัพท์บ้าน ผู้ติดต่อยามฉุกเฉิน",
  contact_person_phone: "หมายเลขโทรศัพท์มือถือ ผู้ติดต่อยามฉุกเฉิน",
  user_photo: "รูปภาพ",
  ///
  medical_certificate: "เอกสารใบรับรองแพทย์",
  national_id_house_registration: "หมายเลขบัตรประชาชน / สำเนาทะเบียนบ้านที่มีหน้านิสิต",
  relationship_verification_document: "เอกสารยืนยันตัวตน",
  payment_slip: "หลักฐานการชำระเงิน",
}

export type RejectInfoLabelKey = keyof RejectInfo

// Modals //
export type ModalVerify =
  | "none"
  | "showConfirmAccept"
  | "showUncomAccept"
  | "showCompleteAccept"
  | "showUncomReject"
  | "showConfirmReject"
  | "showCompleteReject"
  | "showErr"

export type ModalUserInfo =
  | "none"
  | "showDelete"
  | "showComDelete"
  | "showSave"
  | "showComSave"
  | "showUncomExpire"
  | "showErr"
  | "showPasswordErr"
  | "showConfirmChange"
  | "showChangePassword"

export type ModalAddUser = "none" | "showAdd" | "showCom" | "showErr" | "showUsernameErr"

// Alerts //
export type AlertAddUser = "none" | "showAlertUncom" | "showAlertUsername" | "showAlertPassword"

// Registration //
export interface RegistrationInfo {
  membership_type: string
  username: string
  password: string
  repeat_password?: string
}

export interface RegistrationProps {
  registrationInfo?: RegistrationInfo
  isRegister: boolean
}
