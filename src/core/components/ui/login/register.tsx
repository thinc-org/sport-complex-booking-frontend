import React, { useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import OtherAccountEdit from "../../pages/AccountPages/AccountPageUI/OtherEdit"
import { RegistrationInfo } from "../../pages/staff-pages/interfaces/InfoInterface"
import { QuestionCircle, QuestionCircleFill } from "react-bootstrap-icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { registrationSchema } from "../../../schemas/registrationSchema"
//import { client } from "../../../../axiosConfig"
import { NavHeader } from "../navbar/navbarSideEffect"

// TODO

// 6. connect to Firm's new endpoint
// 7. test submitting information
// 8. registration success and failure modals

// DONE
// 1. show account type explanations ok
// 2. use i18n for account names? ok
// 3. work on yup validation ok
// 4. add hints ok
// 5. add payment upload ok

export const Register = () => {
  const otherAccountTypes = [
    "",
    "สมาชิกสามัญ ก (staff membership)",
    "สมาชิกสามัญ ข (student membership)",
    "สมาชิกสามัญสมทบ ก (staff-spouse membership",
    "สมาชิกสามัญสมทบ ข (alumni membership)",
    "สมาชิกวิสามัญ (full membership)",
    "สมาชิกวิสามัญสมทบ (full membership-spouse and children)",
    "สมาชิกวิสามัญเฉพาะสนามกีฬาในร่ม (indoor stadium)",
    "สมาชิกวิสามัญสมทบเฉพาะสนามกีฬาในร่ม (indoor stadium-spouse and children)",
    "สมาชิกรายเดือนสนามกีฬาในร่ม (monthly membership-indoor stadium)",
    "นักเรียนสาธิตจุฬา / บุคลากรจุฬา (Satit Chula Student / CU Personnel)",
  ]
  const [credentials, setCredentials] = useState<RegistrationInfo>()
  const [showAccountHint, setShowAccountHint] = useState(false)
  const { t } = useTranslation()
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(registrationSchema) })
  const [showNextForm, setShowNextForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const registerUser = (data: RegistrationInfo) => {
    setLoading(true)
    console.log(loading)
    // post to backend
    setLoading(false)
  }

  const onSubmit = (data: RegistrationInfo) => {
    data.membership_type = otherAccountTypes[parseInt(data.membership_type)]
    delete data.repeat_password
    console.log(data)
    registerUser(data)
    setShowNextForm(true)
    setCredentials(data)
  }

  const renderDescription = () => {
    const descriptions = []
    let i = 1
    for (i; i < 11; i++) {
      descriptions.push(
        <li key={i}>
          <p>{t(`otherAccountDescription.type${i}`)}</p>
        </li>
      )
    }
    return descriptions
  }

  const renderTypeSelect = () => {
    return (
      <select className="m-0" ref={register} name="membership_type" disabled={showNextForm}>
        <option value={0} disabled>
          {t("otherAccountTypes.question")}
        </option>
        <option value={1}>{t("otherAccountTypes.type1")}</option>
        <option value={2}>{t("otherAccountTypes.type2")}</option>
        <option value={3}>{t("otherAccountTypes.type3")}</option>
        <option value={4}>{t("otherAccountTypes.type4")}</option>
        <option value={5}>{t("otherAccountTypes.type5")}</option>
        <option value={6}>{t("otherAccountTypes.type6")}</option>
        <option value={7}>{t("otherAccountTypes.type7")}</option>
        <option value={8}>{t("otherAccountTypes.type8")}</option>
        <option value={9}>{t("otherAccountTypes.type9")}</option>
        <option value={10}>{t("otherAccountTypes.type10")}</option>
      </select>
    )
  }

  return (
    <>
      <NavHeader header={t("Register")} />
      <div className="mx-auto col-md-6">
        <div className="default-mobile-wrapper mt-3">
          <h4>{t("accountTypeInfo")}</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-3 unselectable">
              <Row className="justify-content-between">
                <label className="form-label mt-2">{t("accountType")}</label>
                <span onClick={() => setShowAccountHint(!showAccountHint)}>
                  {!showAccountHint ? <QuestionCircle className="mt-2" size={20} /> : <QuestionCircleFill className="mt-2" size={20} />}
                </span>
              </Row>
              <Row>
                {showAccountHint && (
                  <div className="hint-card-background mb-3">
                    <ol className="pl-3">{renderDescription()}</ol>
                  </div>
                )}
              </Row>
            </div>
            {renderTypeSelect()}
            <hr />
            <label className="form-label mt-2">{t("username") + ` (${t("personalEmailLabel")})`}</label>
            {!showNextForm && (
              <input
                name="username"
                type="text"
                ref={register}
                defaultValue={credentials?.username}
                placeholder={t("username")}
                className="form-control"
                readOnly={showNextForm}
              />
            )}
            {showNextForm && <p>{credentials?.username}</p>}
            {errors.username && <p id="input-error">{errors.username.message}</p>}
            <label className="form-label mt-2">{t("password")}</label>
            {!showNextForm && (
              <input
                name="password"
                type="password"
                ref={register}
                defaultValue={credentials?.password}
                placeholder={t("password")}
                className="form-control"
                readOnly={showNextForm}
              />
            )}
            {showNextForm && <p>{"•".repeat(credentials ? credentials?.password.length : 8)}</p>}
            {errors.password && <p id="input-error">{errors.password.message}</p>}
            <label className="form-label mt-2">{t("repeatPassword")}</label>
            {!showNextForm && (
              <input
                name="repeat_password"
                type="password"
                ref={register}
                defaultValue={credentials?.password}
                placeholder={t("repeatPassword")}
                className="form-control"
                readOnly={showNextForm}
              />
            )}
            {showNextForm && <p>{"•".repeat(credentials ? credentials?.password.length : 8)}</p>}
            {errors.repeat_password && <p id="input-error">{errors.repeat_password.message}</p>}
            <div className="button-group">
              {showNextForm && (
                <Button onClick={() => setShowNextForm(false)} variant="secondary" className="mt-4 mb-0">
                  {t("edit")}
                </Button>
              )}
              {!showNextForm && (
                <Button type="submit" variant="pink" className="mt-4 mb-0">
                  {t("next")}
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
      {showNextForm && <OtherAccountEdit registrationInfo={credentials} isRegister={true} />}
    </>
  )
}
