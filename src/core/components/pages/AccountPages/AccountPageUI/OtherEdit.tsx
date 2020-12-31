import React from "react"
import { useState,useContext } from "react"
import {  Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { UserContext } from "../../../../contexts/UsersContext"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ConfirmModal, ErrorModal, OtherWarningMessage } from "../../../ui/Modals/AccountPageModals"
import { useTranslation } from 'react-i18next'
import { setCookie } from "../../../../contexts/cookieHandler"
import { client } from "../../../../../axiosConfig"
import { OtherInfo } from "../../staff-pages/interfaces/InfoInterface"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function OtherAccountEdit() {

  // React Hook Forms
  const {t, i18n} = useTranslation()
  const schema = yup.object().shape({
    prefix: yup.string().required(t("fieldIsRequired")),
    gender: yup.string().required(t("fieldIsRequired")),
    name_th: yup.string().required(t("fieldIsRequired")),
    surname_th: yup.string().required(t("fieldIsRequired")),
    name_en: yup.string().required(t("fieldIsRequired")),
    surname_en: yup.string().required(t("fieldIsRequired")),
    national_id: yup.string().required(t("fieldIsRequired")),
    marital_status: yup.string().required(t("fieldIsRequired")),
    address: yup.string().required(t("fieldIsRequired")),
    personal_email: yup.string().required(t("fieldIsRequired")).email(t("emailErrorMessage")),
    home_phone: yup.string().required(t("fieldIsRequired")),
    phone: yup.string().required(t("fieldIsRequired")),
    medical_condition: yup.string(),
    contact_person: yup.object({
      contact_person_prefix: yup.string().required(t("fieldIsRequired")),
      contact_person_name: yup.string().required(t("fieldIsRequired")),
      contact_person_surname: yup.string().required(t("fieldIsRequired")),
      contact_person_home_phone: yup.string().required(t("fieldIsRequired")),
      contact_person_phone: yup.string().required(t("fieldIsRequired")),
    })
    
  })
  const { register, handleSubmit, errors  } = useForm({resolver: yupResolver(schema)})

  let [is_thai_language, set_is_thai_language] = useState(false)
  let [user_photo, set_user_photo] = useState<File>()
  let [national_id_scan, set_national_id_scan] = useState<File>()
  let [medical_certificate, set_medical_certificate] = useState<File>()
  let [house_registration_number, set_house_registration_number] = useState<File>()
  let [relationship_verification_document, set_relationship_verification_document] = useState<File>()
  const [date, setDate] =useState<Date>(new Date())
  const [show, setShow] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const { otherAccount: user } = useContext(UserContext)
  const [formData, setFormData] = useState<OtherInfo>()


  /// JSX Begins here
  const postDataToBackend = async (data: OtherInfo) => {
    await client
      .put("http://localhost:3000/account_info/", data)
      .then(({ data }) => {
        if (data.verification_status === "Submitted") {
          handleAllFilesUpload(user_photo, national_id_scan, medical_certificate, house_registration_number, relationship_verification_document)
        }
        window.location.reload()
      })
      .catch(function (error) {
        if (error.response) {
          setShow(false)
          setShowErr(true)
        }
      })
  }

  const onSubmit = (data: OtherInfo) => {
    setShow(true)
    const valid = schema.isValid(data)
    if (valid) {
      setShow(true)
      setFormData(data)
    }
  }

  // Handlers
  const handleFileUpload = async (formData: FormData) => {
    await client
      .post("http://localhost:3000/fs/upload", formData)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(() =>{
        setShowErr(true)
      })
  }

  const handleAllFilesUpload = async (
    userPhotoInput:File|undefined,
    nationalIdInput:File|undefined,
    medicalCertificateInput:File|undefined,
    houseRegistrationNumberInput:File|undefined,
    relationshipVerificationDocumentInput:File|undefined
  ) => {
    if (userPhotoInput) uploadUserPhoto(userPhotoInput)
    if (nationalIdInput) uploadNationalId(nationalIdInput)
    if (medicalCertificateInput) uploadMedicalCertificate(medicalCertificateInput)
    if (houseRegistrationNumberInput) uploadHouseRegistrationNumber(houseRegistrationNumberInput)
    if (relationshipVerificationDocumentInput) uploadRelationshipVerificationDocument(relationshipVerificationDocumentInput)
  }
  const uploadUserPhoto = (file: File) => {
    let formData = new FormData()
    formData.append("user_photo", file? file: file, file?.name)
    handleFileUpload(formData)
  }
  const uploadNationalId = (file: File) => {
    let formData = new FormData()
    formData.append("national_id_photo",  file? file: file, file?.name)
    handleFileUpload(formData)
  }
  const uploadMedicalCertificate = (file: File) => {
    let formData = new FormData()
    formData.append("medical_certificate",  file? file: file, file?.name)
    handleFileUpload(formData)
  }
  const uploadHouseRegistrationNumber = (file: File) => {
    let formData = new FormData()
    formData.append("house_registration_number",  file? file: file, file?.name)
    handleFileUpload(formData)
  }
  const uploadRelationshipVerificationDocument = (file: File) => {
    let formData = new FormData()
    formData.append("relationship_verification_document", file, file.name)
    handleFileUpload(formData)
  }

  // These functions save the input file to the states
  const assignUserPhoto = (file: FileList) => {
    set_user_photo(file[0])
  }
  const assignNationalIdPhoto = (file: FileList) => {
    set_national_id_scan(file[0])
  }
  const assignMedicalCertificate = (file: FileList) => {
    set_medical_certificate(file[0])
  }
  const assignHouseRegistrationNumber = (file: FileList) => {
    set_house_registration_number(file[0])
  }
  const assignRelationshipVerificationDocument = (file: FileList) => {
    set_relationship_verification_document(file[0])
  }

  const changeLanguage = (is_thai_language) => {
    if (is_thai_language){
      setCookie('is_thai_language', true, 999)
      i18n.changeLanguage('th')
      set_is_thai_language(true)
    } else {
      setCookie('is_thai_language', false, 999)
      i18n.changeLanguage('en')
      set_is_thai_language(false)
    }
    
  }

  return (
    /// THIS IS THE START OF THE EDITING VIEW
    <div className="mx-auto col-md-6">
      <OtherWarningMessage show={user!.verification_status !== ""} verification_status={user!.verification_status} />            
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="default-mobile-wrapper my-3">
          <h4 className="align-right mb-2">{t("language")}</h4>
          <div className="row mt-2 mx-1">
            {!is_thai_language ? (
              <div>
                <Button variant="pink" className="mr-2" onClick={() => changeLanguage(false)}>EN</Button>
                <Button variant="gray" className="btn-outline-dark" onClick={() => changeLanguage(true)}>TH</Button>
              </div>
            ) : (
              <div>
                <Button variant="gray" className="btn-outline-dark mr-2" onClick={() => changeLanguage(false)}>EN</Button>
                <Button variant="pink" className="" onClick={() => changeLanguage(true)}>TH</Button>
              </div>
            )}
          </div>
        </div>

        <div className="default-mobile-wrapper animated-card">
          <div className="">
            {/* START OF THE FORM */}
            <h4>{t("memberInformation")}</h4>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label mt-2">{t("prefix")}</label>

                <select name="prefix" ref={register}  disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('prefix')}>
                  <option value={t("mr")!}>{t("mr")}</option>
                  <option value={t("ms")!}>{t("ms")}</option>
                  <option value={t("mrs")!}>{t("mrs")}</option>
                </select>
                {user?.rejected_info.includes('prefix') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}

              </div>
              <div className="col-md-4">
                <label className="form-label mt-2">{t("gender")}</label>

                <select name="gender" ref={register}  disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('gender')}>
                  <option value={t("male")!}>{t("male")}</option>
                  <option value={t("female")!}>{t("female")}</option>
                  <option value={t("other")!}>{t("other")}</option>
                </select>
                {user?.rejected_info.includes('gender') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
              </div>
            </div>
            <hr />
            <label className="form-label mt-2">{t("name_th")}</label>
            <h6 className="font-weight-light">{t("noThaiName")}</h6>
            <input name="name_th" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('name_th')} placeholder="ชื่อจริง" defaultValue={user?.name_th} className="form-control"/>
            {user?.rejected_info.includes('name_th') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.name_th && <p id="input-error">{errors.name_th.message}</p>}

            <hr />
            <label className="form-label mt-2">{t("surname_th")}</label>
            <h6 className="font-weight-light">{t("noThaiSurname")}</h6>
            <input name="surname_th" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('surname_th')} placeholder="นามสกุล" defaultValue={user?.surname_th} className="form-control"/>
            {user?.rejected_info.includes('surname_th') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.surname_th && <p id="input-error">{errors.surname_th.message}</p>}
            
            <hr />
            <label className="form-label mt-2">{t("name_en")}</label>
            <input name="name_en" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('name_en')} placeholder="Firstname" defaultValue={user?.name_en} className="form-control"/>
            {user?.rejected_info.includes('name_en') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}  
            {errors.name_en && <p id="input-error">{errors.name_en.message}</p>}
            
            <hr />
            <label className="form-label mt-2">{t("surname_en")}</label>
            <input name="surname_en" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('surname_en')} placeholder="Surname" defaultValue={user?.surname_en} className="form-control"/>
            {user?.rejected_info.includes('surname_en') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}  
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
              disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('birthday')}
            />
            </div>
            {user?.rejected_info.includes('birthday') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            </div>
            <hr />
            <label className="form-label mt-2">{t("national_id")}</label>
            <input name="national_id" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('national_id')} placeholder="xxxxxxxxxxxxx" defaultValue={user?.national_id} className="form-control"/>
            {user?.rejected_info.includes('national_id') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.national_id && <p id="input-error">{errors.national_id.message}</p>}
            
            <hr />
            <label className="form-label mt-2">{t("marital_status")}</label>
            <input name="marital_status" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('marital_status')} placeholder="Ex: married" defaultValue={user?.marital_status} className="form-control"/>
            {user?.rejected_info.includes('marital_status') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.marital_status && <p id="input-error">{errors.marital_status.message}</p>}
            
            <hr />
            <label className="form-label mt-2">{t("address")}</label>
            <input name="address" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('address')} placeholder="Address" defaultValue={user?.address} className="form-control"/>
            {user?.rejected_info.includes('address') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.address && <p id="input-error">{errors.address.message}</p>}
            
            <hr />
            <label className="form-label mt-2">{t("email")}</label>
            <input name="personal_email" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('personal_email')} placeholder="example@email.com" defaultValue={user?.personal_email} className="form-control"/>
            {user?.rejected_info.includes('personal_email') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}
            
            <hr />
            <label className="form-label mt-2">{t("home_phone")}</label>
            <input name="home_phone" type="number" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('home_phone')} placeholder="02xxxxxxx" defaultValue={user?.home_phone} className="form-control"/>
            {user?.rejected_info.includes('home_phone') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.home_phone && <p id="input-error">{errors.home_phone.message}</p>}
            
            <hr />
            <label className="form-label mt-2">{t("mobile_phone")}</label>
            <input name="phone" type="number" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('phone')} placeholder="0xxxxxxxxx" defaultValue={user?.phone} className="form-control"/>
            {user?.rejected_info.includes('phone') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.phone && <p id="input-error">{errors.phone.message}</p>}
            
            <hr />
            <label className="form-label mt-2">
              {t("medical_condition")}
            </label>
            <input name="medical_condition" type="text" ref={register({})}
            disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('medical_condition')}
            placeholder="Ex: Asthma" defaultValue={user?.medical_condition} className="form-control"/>
          </div>  
        
        <br />
        <div className="default-mobile-wrapper">
          <h4>{t("emergency_contact")}</h4>
          <div className="col-md-4">
            <label className="form-label mt-2">{t("contact_person_prefix")}</label>
            <select name="contact_person.contact_person_prefix" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('contact_person_prefix')}>
              <option value={t("mr")!}>{t("mr")}</option>
              <option value={t("ms")!}>{t("ms")}</option>
              <option value={t("mrs")!}>{t("mrs")}</option>
            </select>
            {user?.rejected_info.includes('contact_person_prefix') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
          </div>
          
          <hr />
          <label className="form-label mt-2">{t("contact_person_name")}</label>
          <input name="contact_person.contact_person_name" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('contact_person_name')} placeholder="Name" defaultValue={user?.contact_person?.contact_person_name} className="form-control"/>
            {user?.rejected_info.includes('contact_person_name') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.contact_person?.contact_person_name && <p id="input-error">{errors.contact_person.contact_person_name.message}</p>}
          
          <hr />
          <label className="form-label mt-2">{t("contact_person_surname")}</label>
          <input name="contact_person.contact_person_surname" type="text" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('contact_person_surname')} placeholder="Surname" defaultValue={user?.contact_person?.contact_person_surname} className="form-control"/>
            {user?.rejected_info.includes('contact_person_name') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.contact_person?.contact_person_surname && <p id="input-error">{errors.contact_person.contact_person_surname.message}</p>}
          
          <hr />
          <label className="form-label mt-2">{t("contact_person_home_phone")}</label>
          <input name="contact_person.contact_person_home_phone" type="number" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('contact_person_home_phone')} placeholder="xxxxxxxxx" defaultValue={user?.contact_person?.contact_person_home_phone} className="form-control"/>
            {user?.rejected_info.includes('contact_person_home_phone') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.contact_person?.contact_person_home_phone && <p id="input-error">{errors.contact_person.contact_person_home_phone.message}</p>}
          <hr />
          <label className="form-label mt-2">{t("contact_person_phone")}</label>
          <input name="contact_person.contact_person_phone" type="number" ref={register} disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('contact_person_phone')} placeholder="xxxxxxxxxx" defaultValue={user?.contact_person?.contact_person_phone} className="form-control"/>
            {user?.rejected_info.includes('contact_person_phone') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
            {errors.contact_person?.contact_person_phone && <p id="input-error">{errors.contact_person.contact_person_phone.message}</p>}
          
        </div>
        <br />
        <div className="default-mobile-wrapper">
          <h4>{t("memberDocuments")}</h4>
          <hr />
          <label className="form-label my-2">{t("user_photo")}</label>
          <div className="form-file">
            <p>{user_photo ? "File Uploaded. Choose a new file?" : ""}</p>
            <input type="file" className="form-file-input form-control" id="user_photo"  
            disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('user_photo')} 
            onChange={(e) => assignUserPhoto(e.target.files!)} />
          </div>
          {user?.rejected_info.includes('user_photo') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
          <hr />
          <label className="form-label my-2">
            {t("national_id_photo")}
          </label>
          <div className="form-file">
            <p>{national_id_scan ? "File Uploaded. Choose a new file?" : ""}</p>
            <input type="file" className="form-file-input  form-control" id="nationID/passport"
            disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('national_id_photo')} 
            onChange={(e) => assignNationalIdPhoto(e.target.files!)} />
          </div>
          {user?.rejected_info.includes('national_id_photo') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
          <hr />
          <label className="form-label my-2">{t("medical_certificate")}</label>
          <div className="form-file">
            <p>{medical_certificate ? "File Uploaded. Choose a new file?" : ""}</p>
            <input
              type="file" className="form-file-input  form-control" id="medical_certificate"
              disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('medical_certificate')} 
              onChange={(e) => assignMedicalCertificate(e.target.files!)}
            />
          </div>
          {user?.rejected_info.includes('medical_certificate') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
          <hr />
          <label className="form-label my-2">
            {t("house_registration_number")}
          </label>
          <div className="form-file">
            <p>{house_registration_number ? "File Uploaded. Choose a new file?" : ""}</p>
            <input
              type="file" className="form-file-input  form-control" id="house_registration_number"
              disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('house_registration_number')} 
              onChange={(e) => assignHouseRegistrationNumber(e.target.files!)}
            />
          </div>
          {user?.rejected_info.includes('house_registration_number') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
          <hr />
          <label className="form-label my-2">
            {t("relationship_verification_document")}
          </label>
          <div className="form-file">
            <p>{relationship_verification_document ? "File Uploaded. Choose a new file?" : ""}</p>
            <input
              type="file" className="form-file-input  form-control" id="relationship_verification_document"
              disabled={user?.verification_status === "Rejected" && !user?.rejected_info.includes('relationship_verification_document')} 
              onChange={(e) => assignRelationshipVerificationDocument(e.target.files!)}
            />
          </div>
          {user?.rejected_info.includes('relationship_verification_document') ? (<p className="input-error" >{t("resubmitField")}</p>) : (null)}
        </div>
        <br />
        <div className="button-group col-md-12">
          <Button variant="pink" className="btn-secondary" type="submit">
            {t("saveAndSubmit")}
          </Button>
        </div>

        {/* MODAL CONFIRM DIALOGUE */}
        <ConfirmModal show={show} setShow={setShow} postDataToBackend={postDataToBackend} formData={formData!}/>
        {/* MODAL ERROR */}
        <ErrorModal showErr={showErr} setShowErr={setShowErr}/>
        {/* END OF FORM */}
      </form>
    </div>
  )
}
