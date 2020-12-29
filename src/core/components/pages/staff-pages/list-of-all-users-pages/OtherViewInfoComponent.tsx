import React, { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import Info from "../interfaces/InfoInterface"
import format from "date-fns/format"
import isValid from "date-fns/isValid"
import { useTranslation } from "react-i18next"

export default function OtherViewInfoComponent({ info }: { info: Info }) {
  /// Page states
  const [isThai, setThai] = useState<boolean>(true)
  const { i18n, t } = useTranslation()

  useEffect(() => {
    if (isThai) i18n.changeLanguage("th")
    else i18n.changeLanguage("en")
  }, [isThai])

  // handles //
  const handlePDF = (e) => {
    let fileId = e.target.id
    window.open(`/staff/openFile/${fileId}`, "_blank")
  }

  /// JSX Begins here
  let {
    prefix,
    gender,
    name_th,
    surname_th,
    name_en,
    surname_en,
    national_id,
    marital_status,
    birthday,
    address,
    email,
    home_phone,
    phone,
    medical_condition,
    contact_person,
  } = info
  let { contact_person_prefix, contact_person_name, contact_person_surname, contact_person_home_phone, contact_person_phone } = contact_person

  return (
    <div className="row mr-4 mt-5">
      <div className="col">
        <Card body className="shadow mx-4 dim-white">
          {/* START OF THE FORM */}
          <h4>{isThai ? "ข้อมูลสมาชิก" : "Member Information"}</h4>
          <div className="row">
            <div className="col py-2">
              <Button variant="outline-secondary" active={isThai} className="btn-normal btn-outline-black mr-2" onClick={() => setThai(true)}>
                ไทย
              </Button>
              <Button variant="outline-secondary" active={!isThai} className="btn-normal btn-outline-black" onClick={() => setThai(false)}>
                English
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{t("prefix")}</label>
              <p>{prefix}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{t("gender")}</label>
              <p>{gender}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{t("name_th")}</label>
              <p>{name_th}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{t("surname_th")}</label>
              <p>{surname_th}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{t("name_en")}</label>
              <p>{name_en}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{t("surname_en")}</label>
              <p>{surname_en}</p>
            </div>
          </div>
          <label className="form-label mt-2">{t("birthday")}</label>
          <div className="row">
            <div className="col">
              <p>{isValid(new Date(birthday)) ? format(new Date(birthday), "yyyy-MM-dd") : ""}</p>
            </div>
          </div>
          <label className="form-label mt-2">{t("national_id")}</label>
          <p>{national_id}</p>
          <label className="form-label mt-2">{t("marital_status")}</label>
          <p>{marital_status}</p>
          <hr />
          <label className="form-label mt-2">{t("address")}</label>
          <p>{address}</p>
          <label className="form-label mt-2">{t("email")}</label>
          <p>{email}</p>
          <label className="form-label mt-2">{t("home_phone")}</label>
          <p>{home_phone}</p>
          <label className="form-label mt-2">{t("mobile_phone")}</label>
          <p>{phone}</p>
          <label className="form-label mt-2">{t("medical_condition")}</label>
          <p>{medical_condition}</p>
        </Card>
      </div>
      <br />
      <div className="col" style={{ maxWidth: "40%" }}>
        <Card body className="row shadow dim-white">
          <h4>{isThai ? "การติดต่อในกรณีฉุกเฉิน" : "Contact Person in Case of Emergency"}</h4>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{t("contact_person_prefix")}</label>
              <p>{contact_person_prefix}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{t("contact_person_name")}</label>
              <p>{contact_person_name}</p>
            </div>
          </div>
          <label className="form-label mt-2">{t("contact_person_surname")}</label>
          <p>{contact_person_surname}</p>
          <label className="form-label mt-2">{t("contact_person_home_phone")}</label>
          <p>{contact_person_home_phone}</p>
          <label className="form-label mt-2">{t("contact_person_phone")}</label>
          <p>{contact_person_phone}</p>
        </Card>
        <br />
        <Card body className="row shadow dim-white">
          <h4>{isThai ? "เกี่ยวกับสมาชิก" : "Membership"}</h4>
          <h6 className="form-label my-2">{info.membership_type}</h6>
          <label className="form-label my-2">{t("user_photo")}</label>
          <div className="form-file">
            <p className="link" id={info.user_photo} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">{t("national_id_photo")}</label>
          <div className="form-file">
            <p className="link" id={info.national_id_photo} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">{t("medical_certificate")}</label>
          <div className="form-file">
            <p className="link" id={info.medical_certificate} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">{t("house_registration_number")}</label>
          <div className="form-file">
            <p className="link" id={info.house_registration_number} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">{t("relationship_verification_document")}</label>
          <div className="form-file">
            <p className="link" id={info.relationship_verification_document} onClick={handlePDF}>
              View PDF
            </p>
          </div>
        </Card>
      </div>

      {/* END OF FORM */}
      <br />
      <br />
    </div>
  )
}
