export default interface Info {
  prefix: string
  name: string
  surname: string
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
  medical_certifiate: string
  national_id_photo: string
  house_registration_number: string
  relationship_verification_document: string
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
  "Check me out": boolean
}

export interface ModalInfo {
  show_confirm_accept: boolean
  show_uncom_accept: boolean
  show_uncom_reject: boolean
  show_confirm_reject: boolean
}
