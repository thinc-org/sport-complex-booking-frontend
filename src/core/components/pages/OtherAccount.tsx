import React from "react"
import { useState, useEffect, useContext } from "react"
import "bootstrap"
import axios from "axios"
import OtherAaccountDisplay from "./AccountPageUI/OtherDisplay"
import OtherAccountEdit from "./AccountPageUI/OtherEdit"

export default function OtherAccount({ jwt }) {
  /// Page states
  let [is_editting, set_is_editting] = useState(false)
  enum Account {
    CuStudent,
    SatitAndCuPersonel,
    Other,
  }
  let Contact_person = {
    contact_person_prefix: "",
    contact_person_name: "",
    contact_person_surname: "",
    contact_person_home_phone: "",
    contact_person_phone: "",
  }

  /// Non-cu student states
  let [account_type, setAccountType] = useState(Account.CuStudent)
  let [prefix, setPrefix] = useState("")
  let [gender, setGender] = useState("")
  let [is_thai_language, set_is_thai_language] = useState(false)
  let [name_th, set_name_th] = useState("")
  let [surname_th, set_surname_th] = useState("")
  let [name_en, set_name_en] = useState("")
  let [surname_en, set_surname_en] = useState("")
  let [birthday, set_birthday] = useState<Date>()
  let [birthday_day, set_birthday_day] = useState("")
  let [birthday_month, set_birthday_month] = useState("")
  let [birthday_year, set_birthday_year] = useState("")

  let [national_id, set_national_id] = useState("")
  let [marital_status, set_marital_status] = useState("")
  let [address, set_address] = useState("")
  let [phone, set_phone] = useState("")
  let [home_phone, set_home_phone] = useState("")
  let [personal_email, set_personal_email] = useState("")
  let [medical_condition, set_medical_condition] = useState("")
  let [membership_type, set_membership_type] = useState("")
  let [is_penalize, set_is_penalize] = useState(false)
  let [expired_penalize_date, set_expired_penalize_date] = useState(Date)
  let [verification_status, set_verification_status] = useState("")
  let [rejected_info, set_rejected_info] = useState<String[]>([])
  let [account_expiration_date, set_account_expiration_date] = useState<Date>()
  let [user_photo, set_user_photo] = useState()
  let [national_id_scan, set_national_id_scan] = useState()
  let [medical_certificate, set_medical_certificate] = useState()
  let [house_registration_number, set_house_registration_number] = useState()
  let [relationship_verification_document, set_relationship_verification_document] = useState()

  /// Contact Person States
  let [contact_person_prefix, set_contact_person_prefix] = useState("")
  let [contact_person_name, set_contact_person_name] = useState("")
  let [contact_person_surname, set_contact_person_surname] = useState("")
  let [contact_person_home_phone, set_contact_person_home_phone] = useState("")
  let [contact_person_phone, set_contact_person_phone] = useState("")

  /// functions

  useEffect(() => {
    console.log("Function triggered by useEffect")
    fetchUserData()
  }, [])


  const fetchUserData = async () => {
    await axios
      .get("http://localhost:3000/account_info/", {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        console.log(data)
        console.log(data.verification_status)
        set_verification_status(data.verification_status)
        set_name_en(data.name_en)
        set_surname_en(data.surname_en)
        set_name_th(data.name_th)
        set_surname_th(data.surname_th)
        set_phone(data.phone)
        set_personal_email(data.personal_email)
        set_phone(data.phone)
        set_is_thai_language(data.is_thai_language)
        setPrefix(data.prefix)
        set_birthday(data.birthday)
        set_national_id(data.national_id)
        setGender(data.gender)
        set_marital_status(data.marital_status)
        set_address(data.address)
        set_home_phone(data.home_phone)
        if (data.contact_person) {
          set_contact_person_home_phone(data.contact_person.contact_person_home_phone)
          set_contact_person_name(data.contact_person.contact_person_name)
          set_contact_person_phone(data.contact_person.contact_person_phone)
          set_contact_person_prefix(data.contact_person.contact_person_prefix)
          set_contact_person_surname(data.contact_person.contact_person_surname)
        }
        set_medical_condition(data.medical_condition)
        formatDisplayDate()
        if (data.verification_status === "NotSubmitted") {
          console.log("editting view")
          set_is_editting(true)
        } else if (data.verification_status === "Submitted") {
          console.log("successfully submitted")
          set_is_editting(false)
        }
      })
  }

  const toggleEditButton = () => {
    if (is_editting) {
      set_is_editting(false)
      fetchUserData()
    } else {
      set_is_editting(true)
    }
  }

  

  // Formatters
  const formatDisplayDate = () => {
    const day = birthday?.getDay
    const month = birthday?.getMonth
    const year = birthday?.getFullYear
    if (day && month && year) {
      set_birthday_day(day + "")
      set_birthday_month(month + "")
      set_birthday_year(year + "")
    } else {
      set_birthday_day("")
      set_birthday_month("")
      set_birthday_year("")
    }
  }

  /// JSX Begins here
  return verification_status==="Submitted" || verification_status === "Approved" ? (
      <OtherAaccountDisplay jwt={jwt} toggle_edit_button={toggleEditButton}/>
    
  ) : (
      <OtherAccountEdit jwt={jwt} toggle_edit_button={toggleEditButton}/>
    
  )
}
