import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { satitRegistrationInfo, satitRejectedProps } from "../../pages/staff-pages/interfaces/InfoInterface"
import { yupResolver } from "@hookform/resolvers/yup"
import { satitRegistrationSchema } from "../../../schemas/registrationSchema"
import { satitInfoSchema } from "../../../schemas/editUserInfo"
import { NavHeader } from "../navbar/navbarSideEffect"
import { useLanguage } from "../../../i18n/i18n"
import { client } from "../../../../axiosConfig"
import { RegisterResponse, SatitCuPersonel } from "../../../contexts/UsersContext"
import { getCookie, setCookie } from "../../../contexts/cookieHandler"
import { DocumentUploadResponse } from "../../../dto/account.dto"
import { CustomAccountModal, WarningMessage } from "../Modals/AccountPageModals"
import { useHistory } from "react-router"
import BeatLoader from "react-spinners/BeatLoader"

export const RegisterSatit = ({ user }: satitRejectedProps) => {
  const { t } = useTranslation()
  const { register, handleSubmit, errors } = useForm({ resolver: user ? yupResolver(satitInfoSchema) : yupResolver(satitRegistrationSchema) })
  const { changeLanguage, language } = useLanguage()
  const [student_card_photo, set_student_card_photo] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false)
  const [showRegisterErr, setShowRegisterErr] = useState(false)
  const [showUsernameRepeatErr, setShowUsernameRepeatErr] = useState(false)
  const [showFileErr, setShowFileErr] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const history = useHistory()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleFileUpload = (formData: FormData) => {
    client.post<DocumentUploadResponse>("/fs/uploadSatit", formData).catch(() => {
      setShowFileErr(true)
    })
  }

  const uploadStudentCardPhoto = (file: File) => {
    const formData = new FormData()
    formData.append("student_card_photo", file, file?.name)
    handleFileUpload(formData)
  }

  const postDataToBackend = (data: satitRegistrationInfo) => {
    data["personal_email"] = data.username
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    if (student_card_photo) formData.append("student_card_photo", student_card_photo, student_card_photo.name)
    setLoading(true)
    user
      ? client
          .put<SatitCuPersonel>("/account_info", formData)
          .then(() => {
            if (student_card_photo) uploadStudentCardPhoto(student_card_photo)
            setLoading(false)
            window.location.reload()
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.status === 400) setShowUsernameRepeatErr(true)
              else setShowErr(true)
              setLoading(false)
            }
          })
      : client
          .post<RegisterResponse>("/users/satit", formData)
          .then(({ data }) => {
            setCookie("token", data.jwt, 1)
            if (student_card_photo) uploadStudentCardPhoto(student_card_photo)
            setShowRegisterSuccess(true)
            setLoading(false)
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.status === 400) setShowUsernameRepeatErr(true)
              else setShowRegisterErr(true)
              setLoading(false)
            }
          })
  }

  const onSubmit = (data: satitRegistrationInfo) => {
    delete data.repeat_password
    data = { ...data, is_thai_language: language === "th", personal_email: data.username }
    postDataToBackend(data)
  }

  useEffect(() => {
    if (getCookie("token") !== undefined) setIsAuthenticated(true)
    else setIsAuthenticated(false)
    if (isAuthenticated && !user) history.push("/home")
    return
  }, [isAuthenticated, history, user])

  return (
    <>
      <NavHeader header={t("register")} />
      <div className="mx-auto col-md-6">
        {user && <WarningMessage show={user.verification_status !== ""} verification_status={user.verification_status} account={user.account_type} />}
      </div>
      <div className="mx-auto col-md-6">
        <div className="mt-3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {!user && (
              <div className="default-mobile-wrapper mt-3">
                <h4>{t("accountTypeInfo")}</h4>
                <label className="form-label mt-2">{t("username*")}</label>
                <input name="username" type="text" ref={register} placeholder="example@email.com *" className="form-control" />
                {errors.username && <p id="input-error">{errors.username.message}</p>}
                <label className="form-label mt-2">{t("password*")}</label>
                <input name="password" type="password" ref={register} placeholder={t("password*")} className="form-control" />
                {errors.password && <p id="input-error">{errors.password.message}</p>}
                <label className="form-label mt-2">{t("repeatPassword*")}</label>
                <input name="repeat_password" type="password" ref={register} placeholder={t("repeatPassword*")} className="form-control" />
                {errors.repeat_password && <p id="input-error">{errors.repeat_password.message}</p>}
              </div>
            )}

            <div className="default-mobile-wrapper mt-3">
              <h4 className="align-right mb-2">{t("language")}</h4>
              <div className="row mt-2 mx-1">
                {language !== "th" ? (
                  <div>
                    <Button variant="pink" className="btn-outline mr-2" onClick={() => changeLanguage("en")}>
                      EN
                    </Button>
                    <Button variant="gray" className="btn-outline mr-2" onClick={() => changeLanguage("th")}>
                      TH
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button variant="gray" className="btn-outline mr-2" onClick={() => changeLanguage("en")}>
                      EN
                    </Button>
                    <Button variant="pink" className="btn-outline mr-2" onClick={() => changeLanguage("th")}>
                      TH
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="default-mobile-wrapper mt-3">
              <h4>{t("memberInformation")}</h4>
              <label className="form-label mt-2">{t("name_en")}</label>
              <input
                name="name_en"
                type="text"
                ref={register}
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("name_en")}
                defaultValue={user?.name_en}
                placeholder={t("name_en")}
                className="form-control"
              />
              {user?.rejected_info?.includes("name_en") ? <p className="input-error">{t("resubmitField")}</p> : null}
              {errors.name_en && <p id="input-error">{errors.name_en.message}</p>}

              <label className="form-label mt-2">{t("surname_en")}</label>
              <input
                name="surname_en"
                type="text"
                ref={register}
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("surname_en")}
                defaultValue={user?.surname_en}
                placeholder={t("surname_en")}
                className="form-control"
              />
              {user?.rejected_info?.includes("surname_en") ? <p className="input-error">{t("resubmitField")}</p> : null}
              {errors.surname_en && <p id="input-error">{errors.surname_en.message}</p>}

              <label className="form-label mt-2">{t("name_th")}</label>
              <h6 className="font-weight-light">{t("noThaiName")}</h6>
              <input
                name="name_th"
                type="text"
                ref={register}
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("name_th")}
                defaultValue={user?.name_th}
                placeholder={t("name_th")}
                className="form-control"
              />
              {user?.rejected_info?.includes("name_th") ? <p className="input-error">{t("resubmitField")}</p> : null}
              {errors.name_th && <p id="input-error">{errors.name_th.message}</p>}

              <label className="form-label mt-2">{t("surname_th")}</label>
              <h6 className="font-weight-light">{t("noThaiSurname")}</h6>
              <input
                name="surname_th"
                type="text"
                ref={register}
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("surname_th")}
                defaultValue={user?.surname_th}
                placeholder={t("surname_th")}
                className="form-control"
              />
              {user?.rejected_info?.includes("surname_th") ? <p className="input-error">{t("resubmitField")}</p> : null}
              {errors.surname_th && <p id="input-error">{errors.surname_th.message}</p>}

              <label className="form-label mt-2">{t("mobile_phone")}</label>
              <input
                name="phone"
                type="tel"
                ref={register}
                readOnly={user?.verification_status === "Rejected" && !user?.rejected_info?.includes("phone")}
                defaultValue={user?.phone}
                placeholder="0xxxxxxxxx *"
                className="form-control"
              />
              {user?.rejected_info?.includes("phone") ? <p className="input-error">{t("resubmitField")}</p> : null}
              {errors.phone && <p id="input-error">{errors.phone.message}</p>}
            </div>

            <div className="default-mobile-wrapper mt-3">
              <label className="form-label my-2">{t("studentCardPhotoLabel")}</label>
              {!user?.student_card_photo && (
                <div>
                  <p>{student_card_photo ? "✓ " + student_card_photo?.name.substring(0, 30) + "..." : t("noEmpty")}</p>
                  <label htmlFor="student_card_photo" className="form-file-input form-control text-center">
                    {t("chooseFile")}
                  </label>
                </div>
              )}
              {!user?.student_card_photo ? (
                <input
                  style={{ opacity: 0, height: 0 }}
                  type="file"
                  className="form-file-input form-control"
                  id="student_card_photo"
                  required
                  accept="application/pdf,image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]?.size > 2097152) {
                      alert(t("fileTooBig"))
                      e.target.value = ""
                    } else e.target.files && set_student_card_photo(e.target.files[0])
                  }}
                />
              ) : (
                <p>{t("submitted")}</p>
              )}
              {user?.rejected_info?.includes("student_card_photo") ? <p className="input-error">{t("resubmitField")}</p> : null}
            </div>
            <div className="button-group">
              <Button type="submit" variant="pink" className="my-4 mb-0">
                {t("submit")}
                <span className="ml-3 spinner">
                  <BeatLoader color="#fff" loading={loading} size={12} />
                </span>
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* MODAL ERROR */}
      <CustomAccountModal type="fileUploadError" show={showFileErr} setShow={setShowFileErr} />
      <CustomAccountModal type="editAccountErrorModal" show={showErr} setShow={setShowErr} />
      {/* REGISTRATION SUCCESS MODAL */}
      <CustomAccountModal
        type="registrationSuccessModal"
        show={showRegisterSuccess}
        setShow={setShowRegisterSuccess}
        click={() => {
          history.push("/home")
          window.location.reload()
        }}
      />
      {/* REGISTRATION ERROR MODAL */}
      <CustomAccountModal type="registrationErrorModal" show={showRegisterErr} setShow={setShowRegisterErr} />
      <CustomAccountModal type="repeatedUsernameErrorModal" show={showUsernameRepeatErr} setShow={setShowUsernameRepeatErr} />
    </>
  )
}
