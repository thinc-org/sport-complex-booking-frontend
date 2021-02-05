import React, { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { UserContext, Other, RegisterResponse } from "../../../../contexts/UsersContext"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CustomAccountModal, WarningMessage } from "../../../ui/Modals/AccountPageModals"
import { useTranslation } from "react-i18next"
import { setCookie } from "../../../../contexts/cookieHandler"
import { client } from "../../../../../axiosConfig"
import { OtherInfo, RegistrationProps } from "../../staff-pages/interfaces/InfoInterface"
import { DocumentUploadResponse } from "../../../../dto/account.dto"
import { yupResolver } from "@hookform/resolvers/yup"
import { otherInfoSchema } from "../../../../schemas/editUserInfo"
import { useHistory } from "react-router"
import BeatLoader from "react-spinners/BeatLoader"

export default function OtherAccountEdit({ registrationInfo, isRegister }: RegistrationProps) {
  // React Hook Forms
  const { t, i18n } = useTranslation()
  const [is_thai_language, set_is_thai_language] = useState(false)
  const [user_photo, set_user_photo] = useState<File>()
  const [national_id_house_registration, set_national_id_house_registration] = useState<File>()
  const [medical_certificate, set_medical_certificate] = useState<File>()
  const [relationship_verification_document, set_relationship_verification_document] = useState<File>()
  const [payment_slip, set_payment_slip] = useState<File>()
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [showRegisterErr, setShowRegisterErr] = useState(false)
  const { otherAccount: user } = useContext(UserContext)
  const [formData, setFormData] = useState<OtherInfo>()
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(otherInfoSchema) })
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  // Handlers
  const handleFileUpload = (formData: FormData) => {
    client.post<DocumentUploadResponse>("/fs/upload", formData).catch(() => {
      setShow(false)
      setShowErr(true)
    })
  }

  const uploadUserPhoto = (file: File) => {
    const formData = new FormData()
    formData.append("user_photo", file, file?.name)
    handleFileUpload(formData)
  }

  const uploadNationalIdHouseRegistration = (file: File) => {
    const formData = new FormData()
    formData.append("national_id_house_registration", file, file?.name)
    handleFileUpload(formData)
  }
  const uploadMedicalCertificate = (file: File) => {
    const formData = new FormData()
    formData.append("medical_certificate", file, file?.name)
    handleFileUpload(formData)
  }

  const uploadRelationshipVerificationDocument = (file: File) => {
    const formData = new FormData()
    formData.append("relationship_verification_document", file, file.name)
    handleFileUpload(formData)
  }

  const uploadPaymentEvidence = (file: File) => {
    const formData = new FormData()
    formData.append("payment_slip", file, file.name)
    handleFileUpload(formData)
  }

  const handleAllFilesUpload = (
    userPhotoInput: File | undefined,
    nationalIdHouseRegistration: File | undefined,
    medicalCertificateInput: File | undefined,
    relationshipVerificationDocumentInput: File | undefined,
    paymentEvidence: File | undefined
  ) => {
    if (userPhotoInput) uploadUserPhoto(userPhotoInput)
    if (nationalIdHouseRegistration) uploadNationalIdHouseRegistration(nationalIdHouseRegistration)
    if (medicalCertificateInput) uploadMedicalCertificate(medicalCertificateInput)
    if (relationshipVerificationDocumentInput) uploadRelationshipVerificationDocument(relationshipVerificationDocumentInput)
    if (paymentEvidence) uploadPaymentEvidence(paymentEvidence)
  }

  const changeLanguage = (is_thai_language: boolean) => {
    if (is_thai_language) {
      setCookie("is_thai_language", true, 999)
      i18n.changeLanguage("th")
      set_is_thai_language(true)
    } else {
      setCookie("is_thai_language", false, 999)
      i18n.changeLanguage("en")
      set_is_thai_language(false)
    }
  }

  const postDataToBackend = (data: Other) => {
    setLoading(true)
    if (isRegister) {
      client
        .post<RegisterResponse>("/users/other", { ...data, is_thai_language: is_thai_language, ...registrationInfo, birthday: date })
        .then(({ data }) => {
          setCookie("token", data.jwt, 1)
          handleAllFilesUpload(user_photo, national_id_house_registration, medical_certificate, relationship_verification_document, payment_slip)
          setShowRegisterSuccess(true)
          setLoading(false)
        })
        .catch((err) => {
          if (err.response) {
            setShow(false)
            setShowRegisterErr(true)
            setLoading(false)
          }
        })
    } else {
      client
        .put<Other>("/account_info/", { ...data, is_thai_language: is_thai_language, birthday: date })
        .then(({ data }) => {
          if (data.verification_status === "Submitted") {
            handleAllFilesUpload(user_photo, national_id_house_registration, medical_certificate, relationship_verification_document, payment_slip)
          }
          setLoading(false)
          window.location.reload()
        })
        .catch(function (error) {
          if (error.response) {
            setShow(false)
            setShowErr(true)
            setLoading(false)
          }
        })
    }
  }

  const onSubmit = (data: OtherInfo) => {
    setShow(true)
    setShow(true)
    setFormData(data)
  }

  return (
    /// THIS IS THE START OF THE EDITING VIEW
    <div className="mx-auto col-md-6">
      {!isRegister && user && (
        <WarningMessage show={user.verification_status !== ""} verification_status={user.verification_status} account={user.account_type} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
        <div className="default-mobile-wrapper mt-3">
          <h4 className="align-right mb-2">{t("language")}</h4>
          <div className="row mt-2 mx-1">
            {!is_thai_language ? (
              <div>
                <Button variant="pink" className="btn-outline mr-2" onClick={() => changeLanguage(false)}>
                  EN
                </Button>
                <Button variant="gray" className="btn-outline mr-2" onClick={() => changeLanguage(true)}>
                  TH
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="gray" className="btn-outline mr-2" onClick={() => changeLanguage(false)}>
                  EN
                </Button>
                <Button variant="pink" className="btn-outline mr-2" onClick={() => changeLanguage(true)}>
                  TH
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="default-mobile-wrapper mt-3 animated-card">
          <div className="">
            {/* START OF THE FORM */}
            <h4>{t("memberInformation")}</h4>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label mt-2">{t("prefix")}</label>

                <select
                  name="prefix"
                  ref={register}
                  defaultValue={user?.prefix}
                  disabled={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("prefix")}
                >
                  <option value={t("mr").toString()}>{t("mr")}</option>
                  <option value={t("ms").toString()}>{t("ms")}</option>
                  <option value={t("mrs").toString()}>{t("mrs")}</option>
                </select>
                {user?.rejected_info?.includes("prefix") ? <p className="input-error">{t("resubmitField")}</p> : null}
              </div>
              <div className="col-md-4">
                <label className="form-label mt-2">{t("gender")}</label>

                <select
                  name="gender"
                  ref={register}
                  defaultValue={user?.gender}
                  disabled={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("gender")}
                >
                  <option value={t("male").toString()}>{t("male")}</option>
                  <option value={t("female").toString()}>{t("female")}</option>
                  <option value={t("other").toString()}>{t("other")}</option>
                </select>
                {user?.rejected_info?.includes("gender") ? <p className="input-error">{t("resubmitField")}</p> : null}
              </div>
            </div>
            <hr />
            <label className="form-label mt-2">{t("name_th")}</label>
            <h6 className="font-weight-light">{t("noThaiName")}</h6>
            <input
              name="name_th"
              type="text"
              ref={register}
              readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("name_th")}
              placeholder="ชื่อจริง"
              defaultValue={user?.name_th}
              className="form-control"
            />
            {user?.rejected_info?.includes("name_th") ? <p className="input-error">{t("resubmitField")}</p> : null}
            {errors.name_th && <p id="input-error">{errors.name_th.message}</p>}

            <hr />
            <label className="form-label mt-2">{t("surname_th")}</label>
            <h6 className="font-weight-light">{t("noThaiSurname")}</h6>
            <input
              name="surname_th"
              type="text"
              ref={register}
              readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("surname_th")}
              placeholder="นามสกุล"
              defaultValue={user?.surname_th}
              className="form-control"
            />
            {user?.rejected_info?.includes("surname_th") ? <p className="input-error">{t("resubmitField")}</p> : null}
            {errors.surname_th && <p id="input-error">{errors.surname_th.message}</p>}

            <hr />
            <label className="form-label mt-2">{t("name_en")}</label>
            <input
              name="name_en"
              type="text"
              ref={register}
              readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("name_en")}
              placeholder="Firstname"
              defaultValue={user?.name_en}
              className="form-control"
            />
            {user?.rejected_info?.includes("name_en") ? <p className="input-error">{t("resubmitField")}</p> : null}
            {errors.name_en && <p id="input-error">{errors.name_en.message}</p>}

            <hr />
            <label className="form-label mt-2">{t("surname_en")}</label>
            <input
              name="surname_en"
              type="text"
              ref={register}
              readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("surname_en")}
              placeholder="Surname"
              defaultValue={user?.surname_en}
              className="form-control"
            />
            {user?.rejected_info?.includes("surname_en") ? <p className="input-error">{t("resubmitField")}</p> : null}
            {errors.surname_en && <p id="input-error">{errors.surname_en.message}</p>}
            <label className="form-label mt-2">{t("birthday")}</label>
            <div>
              <DatePicker
                className="form-control date-picker"
                selected={date}
                onChange={(date: Date) => {
                  setDate(date)
                }}
                showYearDropdown
                maxDate={new Date()}
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("birthday")}
              />
            </div>
            {user?.rejected_info?.includes("birthday") ? <p className="input-error">{t("resubmitField")}</p> : null}
          </div>
          <hr />
          <label className="form-label mt-2">{t("national_id")}</label>
          <input
            name="national_id"
            type="text"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("national_id")}
            placeholder="xxxxxxxxxxxxx"
            defaultValue={user?.national_id}
            className="form-control"
          />
          {user?.rejected_info?.includes("national_id") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.national_id && <p id="input-error">{errors.national_id.message}</p>}

          <hr />
          <label className="form-label mt-2">{t("marital_status")}</label>
          <input
            name="marital_status"
            type="text"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("marital_status")}
            placeholder={t("maritalPlaceHolder")}
            defaultValue={user?.marital_status}
            className="form-control"
          />
          {user?.rejected_info?.includes("marital_status") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.marital_status && <p id="input-error">{errors.marital_status.message}</p>}

          <hr />
          <label className="form-label mt-2">{t("address")}</label>
          <input
            name="address"
            type="text"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("address")}
            placeholder={t("addressPlaceHolder")}
            defaultValue={user?.address}
            className="form-control"
          />
          {user?.rejected_info?.includes("address") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.address && <p id="input-error">{errors.address.message}</p>}

          <hr />
          <label className="form-label mt-2">{t("email")}</label>
          <input
            name="personal_email"
            type="text"
            ref={register}
            readOnly={(user?.verification_status === "Rejected" && !user?.rejected_info?.includes("personal_email")) || isRegister}
            placeholder="example@email.com"
            defaultValue={isRegister ? registrationInfo?.username : user?.personal_email}
            className="form-control"
          />
          {user?.rejected_info?.includes("personal_email") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}

          <hr />
          <label className="form-label mt-2">{t("home_phone")}</label>
          <input
            name="home_phone"
            type="number"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("home_phone")}
            placeholder="02xxxxxxx"
            defaultValue={user?.home_phone}
            className="form-control"
          />
          {user?.rejected_info?.includes("home_phone") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.home_phone && <p id="input-error">{errors.home_phone.message}</p>}

          <hr />
          <label className="form-label mt-2">{t("mobile_phone")}</label>
          <input
            name="phone"
            type="number"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("phone")}
            placeholder="0xxxxxxxxx"
            defaultValue={user?.phone}
            className="form-control"
          />
          {user?.rejected_info?.includes("phone") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.phone && <p id="input-error">{errors.phone.message}</p>}

          <hr />
          <label className="form-label mt-2">{t("medical_condition")}</label>
          <input
            name="medical_condition"
            type="text"
            ref={register({})}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("medical_condition")}
            placeholder="Ex: Asthma"
            defaultValue={user?.medical_condition}
            className="form-control"
          />
        </div>

        <br />
        <div className="default-mobile-wrapper">
          <h4>{t("emergency_contact")}</h4>
          <label className="form-label mt-2">{t("contact_person_prefix")}</label>
          <select
            name="contact_person.contact_person_prefix"
            ref={register}
            defaultValue={user?.contact_person_prefix}
            disabled={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("contact_person_prefix")}
          >
            <option value={t("mr").toString()}>{t("mr")}</option>
            <option value={t("ms").toString()}>{t("ms")}</option>
            <option value={t("mrs").toString()}>{t("mrs")}</option>
          </select>
          {user?.rejected_info?.includes("contact_person_prefix") ? <p className="input-error">{t("resubmitField")}</p> : null}

          <hr />
          <label className="form-label mt-2">{t("contact_person_name")}</label>
          <input
            name="contact_person.contact_person_name"
            type="text"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("contact_person_name")}
            placeholder={t("namePlaceHolder")}
            defaultValue={user?.contact_person_name}
            className="form-control"
          />
          {user?.rejected_info?.includes("contact_person_name") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.contact_person?.contact_person_name && <p id="input-error">{errors.contact_person?.contact_person_name.message}</p>}

          <hr />
          <label className="form-label mt-2">{t("contact_person_surname")}</label>
          <input
            name="contact_person.contact_person_surname"
            type="text"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("contact_person_surname")}
            placeholder={t("surnamePlaceHolder")}
            defaultValue={user?.contact_person_surname}
            className="form-control"
          />
          {user?.rejected_info?.includes("contact_person_surname") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.contact_person?.contact_person_surname && <p id="input-error">{errors.contact_person?.contact_person_surname.message}</p>}

          <hr />
          <label className="form-label mt-2">{t("contact_person_home_phone")}</label>
          <input
            name="contact_person.contact_person_home_phone"
            type="number"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("contact_person_home_phone")}
            placeholder="0xxxxxxxx"
            defaultValue={user?.contact_person?.contact_person_home_phone}
            className="form-control"
          />
          {user?.rejected_info?.includes("contact_person_home_phone") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.contact_person?.contact_person_home_phone && <p id="input-error">{errors.contact_person?.contact_person_home_phone.message}</p>}
          <hr />
          <label className="form-label mt-2">{t("contact_person_phone")}</label>
          <input
            name="contact_person.contact_person_phone"
            type="number"
            ref={register}
            readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("contact_person_phone")}
            placeholder="0xxxxxxxxx"
            defaultValue={user?.contact_person_phone}
            className="form-control"
          />
          {user?.rejected_info?.includes("contact_person_phone") ? <p className="input-error">{t("resubmitField")}</p> : null}
          {errors.contact_person?.contact_person_phone && <p id="input-error">{errors.contact_person?.contact_person_phone.message}</p>}
        </div>
        <br />
        <div className="default-mobile-wrapper">
          <h4>{t("memberDocuments")}</h4>
          <hr />
          <label className="form-label my-2">{t("user_photo")}</label>
          <div className="form-file">
            {!user?.user_photo && (
              <div>
                <p>{user_photo ? "✓ " + user_photo?.name.substring(0, 30) + "..." : t("noEmpty")}</p>
                <label htmlFor="user_photo" className="form-file-input form-control text-center">
                  {t("chooseFile")}
                </label>
              </div>
            )}
            {!user?.user_photo ? (
              <input
                style={{ display: "none" }}
                type="file"
                className="form-file-input form-control"
                id="user_photo"
                required
                accept="image/png, image/jpeg"
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("user_photo")}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]?.size > 2097152) {
                    e.target.value = ""
                    alert("fileTooBig")
                  } else e.target.files && set_user_photo(e.target.files[0])
                }}
              />
            ) : (
              <p>{t("submitted")}</p>
            )}
          </div>
          {user?.rejected_info?.includes("user_photo") ? <p className="input-error">{t("resubmitField")}</p> : null}
          <hr />
          <label className="form-label my-2">{t("national_id_house_registration")}</label>
          <div className="form-file">
            {!user?.national_id_house_registration && (
              <div>
                <p>{national_id_house_registration ? "✓ " + national_id_house_registration?.name.substring(0, 30) + "..." : t("noEmpty")}</p>
                <label htmlFor="national_id_house_registration" className="form-file-input form-control text-center">
                  {t("chooseFile")}
                </label>
              </div>
            )}
            {!user?.national_id_house_registration ? (
              <input
                style={{ display: "none" }}
                type="file"
                className="form-file-input  form-control"
                id="national_id_house_registration"
                required
                accept="application/pdf"
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("national_id_house_registration")}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]?.size > 2097152) {
                    e.target.value = ""
                    alert("fileTooBig")
                  } else e.target.files && set_national_id_house_registration(e.target.files[0])
                }}
              />
            ) : (
              <p>{t("submitted")}</p>
            )}
          </div>
          {user?.rejected_info?.includes("national_id_house_registration") ? <p className="input-error">{t("resubmitField")}</p> : null}
          <hr />
          <label className="form-label my-2">{t("medical_certificate")}</label>
          <div className="form-file">
            {!user?.medical_certificate && (
              <div>
                <p>{medical_certificate ? "✓ " + medical_certificate?.name.substring(0, 30) + "..." : t("noEmpty")}</p>
                <label htmlFor="medical_certificate" className="form-file-input form-control text-center">
                  {t("chooseFile")}
                </label>
              </div>
            )}
            {!user?.medical_certificate ? (
              <input
                style={{ display: "none" }}
                type="file"
                className="form-file-input  form-control"
                id="medical_certificate"
                required
                accept="application/pdf"
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("medical_certificate")}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]?.size > 2097152) {
                    e.target.value = ""
                    alert("fileTooBig")
                  } else e.target.files && set_medical_certificate(e.target.files[0])
                }}
              />
            ) : (
              <p>{t("submitted")}</p>
            )}
          </div>
          {user?.rejected_info?.includes("medical_certificate") ? <p className="input-error">{t("resubmitField")}</p> : null}
          <hr />
          {(user?.membership_type === "สมาชิกสามัญสมทบ ก (staff-spouse membership" ||
            registrationInfo?.membership_type === "สมาชิกสามัญสมทบ ก (staff-spouse membership") && (
            <div>
              <label className="form-label my-2">{t("relationship_verification_document")}</label>
              <div className="form-file">
                {!user?.relationship_verification_document && (
                  <div>
                    <p>
                      {relationship_verification_document ? "✓ " + relationship_verification_document?.name.substring(0, 30) + "..." : t("noEmpty")}
                    </p>
                    <label htmlFor="relationship_verification_document" className="form-file-input form-control text-center">
                      {t("chooseFile")}
                    </label>
                  </div>
                )}
                {!user?.relationship_verification_document ? (
                  <input
                    style={{ display: "none" }}
                    type="file"
                    required
                    className="form-control"
                    id="relationship_verification_document"
                    accept="application/pdf"
                    readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("relationship_verification_document")}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]?.size > 2097152) {
                        e.target.value = ""
                        alert("fileTooBig")
                      } else e.target.files && set_relationship_verification_document(e.target.files[0])
                    }}
                  />
                ) : (
                  <p>{t("submitted")}</p>
                )}
              </div>
            </div>
          )}
          {user?.rejected_info?.includes("relationship_verification_document") ? <p className="input-error">{t("resubmitField")}</p> : null}
        </div>
        <div className="default-mobile-wrapper mt-3">
          <h4>{t("paymentSection")}</h4>
          <label className="form-label my-2">{t("paymentEvidenceLabel")}</label>
          <div className="form-file">
            {!user?.payment_slip && (
              <div>
                <p>{payment_slip ? "✓ " + payment_slip?.name.substring(0, 30) + "..." : t("noEmpty")}</p>
                <label htmlFor="paymentEvidence" className="form-file-input form-control text-center">
                  {t("chooseFile")}
                </label>
              </div>
            )}
            {!user?.payment_slip ? (
              <input
                style={{ display: "none" }}
                type="file"
                required
                className="form-control"
                id="paymentEvidence"
                accept="application/pdf, image/png, image/jpeg"
                readOnly={user?.verification_status === "Rejected"}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]?.size > 2097152) {
                    e.target.value = ""
                    alert("fileTooBig")
                  } else e.target.files && set_payment_slip(e.target.files[0])
                }}
              />
            ) : (
              <p>{t("submitted")}</p>
            )}
          </div>
          {user?.rejected_info.includes("payment_slip") ? <p className="input-error">{t("resubmitField")}</p> : null}
        </div>
        <br />
        <div className="button-group col-md-12">
          <Button variant="pink" className="btn-secondary" type="submit">
            {isRegister ? t("register") : t("saveAndSubmit")}
            <span className="ml-3 spinner">
              <BeatLoader color="#fff" loading={loading} size={12} />
            </span>
          </Button>
        </div>

        {/* MODAL CONFIRM DIALOGUE */}
        <CustomAccountModal type="confirmEditOtherAccountModal" show={show} setShow={setShow} mainFunction={postDataToBackend} data={formData} />
        {/* MODAL ERROR */}
        <CustomAccountModal type="editAccountErrorModal" show={showErr} setShow={setShowErr} />
        {/* REGISTRATION SUCCESS MODAL */}
        <CustomAccountModal
          type="registrationSuccessModal"
          show={showRegisterSuccess}
          setShow={setShowRegisterSuccess}
          click={() => {
            history.push("/login")
          }}
        />
        {/* REGISTRATION SUCCESS MODAL */}
        <CustomAccountModal type="registrationErrorModal" show={showRegisterErr} setShow={setShowRegisterErr} />
      </form>
    </div>
  )
}
